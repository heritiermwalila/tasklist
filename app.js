const form = document.getElementById('task-form');
const input = document.getElementById('task');
const filter = document.getElementById('filter');
const ulContainer = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');



loadAllEventListener();


function loadAllEventListener(){
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', AddTaskToUl);
	ulContainer.addEventListener('click', clearTask);
	clearTasks.addEventListener('click', removeAllTask);
	filter.addEventListener('keyup', filterTask);

}

//get task from LS

function getTasks(){

	let tasks;
	if(localStorage.getItem('tasks') === null){

		tasks = [];

	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(tasks){

		//create li to append to ul

	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(tasks));


	//create a delete link to append to li

	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<span>Delete</span>';

	li.appendChild(link);


	ulContainer.appendChild(li);

	})
}

function AddTaskToUl(e){

	let inputValue = input.value;

	if(inputValue ==''){

		alert('can\'t add an empty task to the list');

	}else{
	//create li to append to ul

	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(inputValue));


	//create a delete link to append to li

	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<span>Delete</span>';

	li.appendChild(link);


	ulContainer.appendChild(li);

	//store in the local storage

	storeInLocalStorage(inputValue);


	input.value = '';
	e.preventDefault();
	}

	
}

//store in local storage function

function storeInLocalStorage(task){

	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
	
}

// fucntion to clear task for the ul

function clearTask(e){

	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Do you want to delete')){
		e.target.parentElement.parentElement.remove();

		//remove from local storage

		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
	}
	e.preventDefault();

}

//remove from LS

function removeTaskFromLocalStorage(taskItem){

	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach(function(task, index){

		if (taskItem.textContent === task) {

			tasks.splice(index, 1);
		}

	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove all task from the list

function removeAllTask(e){


	ulContainer.innerHTML = '';

	localStorage.clear();


	e.preventDefault();

}

//filter through task 

function filterTask(e){

	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;

		if(item.toLowerCase().indexOf(text) != -1){

			task.style.display = 'block';

		}else{
			task.style.display = 'none';

		}
	});


	

}

