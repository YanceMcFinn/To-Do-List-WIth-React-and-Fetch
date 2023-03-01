import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
//include images into your bundle


//create your first component


const toDoList = () => {
	const [task, setTask] = useState([])
	
	const handleRemoveItem = (id) => {
		const newList = task.filter(item => item.id != id)
		setTask(newList)

	   }

	const addItem = (e) =>{
	e.keyCode === 13 && setTask(task.concat({desc: e.target.value}))
	if (e.keyCode === 13){
		document.getElementById("input").value = "";
	}}
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
							  {t.desc}<span id="delete" onClick={() => handleRemoveItem(t.id)}><FontAwesomeIcon icon={faCircleXmark} /></span>
							</li>
						  ))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default toDoList;
