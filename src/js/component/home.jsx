import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
//include images into your bundle


//create your first component


const toDoList = () => {
	const [task, setTask] = useState([])

	useEffect(() =>
        // here I fetch my todos from the API
        fetch('https://assets.breatheco.de/apis/fake/todos/user/seancole')
            .then(r => r.json())
            .then(data => setTask(data))
			.then(console.log(task)) // here it re-set the variable tasks with the incoming data
    , []
	);

	
	const handleRemoveItem = (id) => {
		const newList = task.filter(item => item.id != id)
		setTask(newList)
	}

	const addItem = (e) =>{
	if (e.keyCode === 13){
		
		if (e.target.value.replace(/\s/g, '') == ''){
			alert ("field cannot be empty!");
			document.getElementById("input").value = "";
		}
		else {
			e.keyCode === 13 && setTask(task.concat({label: e.target.value, done: false}));
			document.getElementById("input").value = "";
			
			fetch('https://assets.breatheco.de/apis/fake/todos/user/seancole', {  
				method: 'PUT',  
				body: JSON.stringify(task)
		})
		.then(console.log(JSON.stringify(task)))
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));
	}
	}
	
	 // body data type must match "Content-Type" header

  
  
}
	return (
		<div className="container-fluid">
			<div className="row d-flex text-center">
				<p id="toDoTitle">To-Do List</p>
			</div>
			<div className="row d-flex justify-content-center">
				<div className="col-10">
					<ul className="list-group">
						<li className="list-group-item"><input id="input" placeholder="Add task here" onKeyUp={addItem}/></li>
  							{task.length === 0 ? <li className="list-group-item"> No tasks. Please add tasks to list.</li> : task.map(t => (
							<li className="list-group-item" key={t.id = Math.floor(Math.random() * 1000)}>
							  {t.label}<span id="delete" onClick={() => handleRemoveItem(t.id)}><FontAwesomeIcon icon={faCircleXmark} /></span>
							</li>
						  ))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default toDoList;
