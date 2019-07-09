const list = document.querySelector('.taskFeed');
const forms = document.forms;

    const addForm = forms['addTask'];
    addForm.addEventListener('submit', function(e){
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
    });



    // delete task
    list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
    }
  });
  
      // mark as complete

      list.addEventListener('click', (e) => {
        const taskLi = document.querySelectorAll('li');
        taskLi.forEach(li => {
          if(li.contains(e.target)){
              li.classList.toggle('done');
          }
        });

      });