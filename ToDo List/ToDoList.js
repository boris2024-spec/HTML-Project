

let tasks = [];

const addButton = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
});

addButton.addEventListener('click', () => {
    addTask();
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
    taskInput.focus();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
          <div class="task-content">
            <div class="task ${task.completed ? 'completed' : ''}">${task.text}</div>
            <div class="actions">
              <button class="btn btn-success">✔</button>
              <button class="btn btn-danger">✖</button>
            </div>
          </div>
        `;

        const completeBtn = li.querySelector('.btn-success');
        const removeBtn = li.querySelector('.btn-danger');

        completeBtn.addEventListener('click', () => {
            toggleTask(index);
        });
        removeBtn.addEventListener('click', () => {
            removeTask(index);
        });

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




