document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Handle Tab and Delete key events
    document.addEventListener('keydown', (event) => {
        const activeTask = document.activeElement;
        if (event.key === 'Tab') {
            // Navigate through tasks
            event.preventDefault();
            const tasks = document.querySelectorAll('#task-list li');
            let index = Array.from(tasks).indexOf(activeTask);
            index = (index + 1) % tasks.length;
            tasks[index].focus();
        } else if (event.key === 'Delete') {
            // Delete the focused task
            if (activeTask && activeTask.tagName === 'LI') {
                activeTask.querySelector('.delete-btn').click();
            }
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.tabIndex = 0;  // Make list item focusable

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    const taskName = document.createElement('span');
    taskName.textContent = taskText;

    const taskTime = document.createElement('span');
    taskTime.className = 'task-time';
    const startTime = new Date();
    taskTime.textContent = `Added just now`;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskName);
    taskContent.appendChild(taskTime);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };

    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';

    setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let timeString = '';
        if (days > 0) {
            timeString += `${days}d `;
        }
        if (hours > 0) {
            timeString += `${hours % 24}h `;
        }
        if (minutes > 0) {
            timeString += `${minutes % 60}m `;
        }
        timeString += `${seconds % 60}s ago`;

        taskTime.textContent = `Added ${timeString}`;
    }, 1000);
}
