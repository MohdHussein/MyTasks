const list = document.querySelector('.taskFeed');
const forms = document.forms;
const items = JSON.parse(localStorage.getItem('items')) || [];
const addForm = forms['addTask'];

function newTask(e){
  e.preventDefault();
    
  // create elements
  const value = addForm.querySelector('input[type="text"]').value;
  const li = document.createElement('li');
  const taskText = document.createElement('span');
  const deleteBtn = document.createElement('span');

  // add text content
  taskText.textContent = value;
  deleteBtn.textContent = 'x';

  // add class name
  taskText.classList.add('task');
  deleteBtn.classList.add('delete');

  // append to DOM
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  list.insertBefore(li, list.querySelector('li:first-child'));

  
  const item = {text: value, done: false};
  items.unshift(item);
  populateList(items, list);
  localStorage.setItem('items', JSON.stringify(items));
  document.getElementById("addTask").reset();

}
function populateList(tasks = [], list) {
  list.innerHTML = tasks.map((task) => {
    return `
      <li ${task.done ? 'class="done"' : ''} >
        <span class="task">${task.text}</span>
        <span class="delete">x</span>
      </li>
      `;
    }).join('');
}
  
function deleteTask(e){
  const li = e.target.parentElement;
  const lisArr = Array.from(list.children);
  const i = lisArr.indexOf(li);
    
  if(e.target.className == 'delete'){
      list.removeChild(li);
      items.splice(i, 1);
      localStorage.setItem('items', JSON.stringify(items));    
  }
  
  /* if(list.children.length == 0){
    localStorage.clear();
  } */
} 
// mark as complete
function completeList(e) {
  const targetLi = e.target.tagName === 'LI' ? e.target : e.target.parentElement;
  const lisArr = Array.from(list.children);
  const index = lisArr.indexOf(targetLi);
  const taskLi = document.querySelectorAll('li');

  taskLi.forEach(li => {

    if(li.contains(e.target)){
      li.classList.toggle('done');
      items[index].done = !items[index].done;
      populateList(items, list);
      localStorage.setItem('items', JSON.stringify(items));
    }
  });
};

addForm.addEventListener('submit', newTask);
list.addEventListener('click', deleteTask);
list.addEventListener('click', completeList);

populateList(items, list);
