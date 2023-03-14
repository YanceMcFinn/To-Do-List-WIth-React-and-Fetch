import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';



const toDoList = () => {
	const [task, setTask] = useState([])
	const [input, setInput] = useState("")
	const [skipCount, setSkipCount] = useState(true);

	useEffect(() =>
        // here I fetch my todos from the API
        fetch('https://assets.breatheco.de/apis/fake/todos/user/seancole')
            .then(r => r.json())
            .then(data => setTask(data))
			.then(console.log(task)) // here it re-set the variable tasks with the incoming data
    , []
	);

	useEffect(() => {
	if (skipCount) setSkipCount(false);
	if (!skipCount) {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/seancole',{  
				method: 'PUT',
				headers: new Headers({'content-type': 'application/json'}),  
				body: JSON.stringify(task)
		})}
		// .then(res => {
		// 	if (!res.ok) throw Error(res.statusText);
		// 	return res.json();
		// })
		// .then(response => console.log('Success:', response))
		// .catch(error => console.error(error))
	}, [task]
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
	
		}
		
		
	}

  
}
	return (
		<div className="container-fluid">
			<div className="row d-flex text-center">
				<p id="toDoTitle">TO-DO LIST 2.0</p>
				<p id="toDoSubTitle">WITH API<span id="copy1"><sup>&copy;</sup></span> TECHNOLOGY</p>
			</div>
			<div className="row d-flex justify-content-center">
				<div className="col-10">
					<ul className="list-group">
						<li className="list-group-item"><input id="input" placeholder="Add task here" onKeyUp={addItem} /></li>
  							{task.length === 0 ? <li className="list-group-item"> No tasks. Please add tasks to list.</li> : task.map(t => (
							<li className="list-group-item" key={t.id= Math.floor(Math.random() * 1000)}>
							  {t.label}<span id="delete" onClick={() => handleRemoveItem(t.id)}><FontAwesomeIcon icon={faCircleXmark} /></span>
							</li>
						  ))}
					</ul>
				</div>
			</div>
			<div className="row d-flex text-center">
				<p id="footer">Copyright Sean Cole 2023</p>
			</div>
		</div>
	);
};

export default toDoList;
