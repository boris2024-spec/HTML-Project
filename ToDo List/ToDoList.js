document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        if (taskText.trim() !== '') {
            const newTask = document.createElement('li');
            newTask.classList.add('task-item');
            newTask.innerHTML = `
                <div class="task-content">
                    <div class="task">${taskText}</div>
                    <div class="actions">
                        <button class="btn btn-success">✔</button>
                        <button class="btn btn-danger">✖</button>
                    </div>
                </div>
            `;
            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-danger')) {
            event.target.closest('li').remove();
        } else if (event.target.classList.contains('btn-success')) {
            event.target.closest('li').querySelector('.task').classList.toggle('completed');
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
});