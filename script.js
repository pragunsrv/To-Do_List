function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}
