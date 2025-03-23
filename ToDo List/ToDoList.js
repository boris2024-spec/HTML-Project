// document.addEventListener('DOMContentLoaded', () => {
//     const addButton = document.getElementById('addTaskBtn');
//     const taskInput = document.getElementById('taskInput');
//     const taskList = document.getElementById('taskList');

//     addButton.addEventListener('click', () => {
//         const taskText = taskInput.value;
//         if (taskText.trim() !== '') {
//             const newTask = document.createElement('li');
//             newTask.classList.add('task-item');
//             newTask.innerHTML = `
//                 <div class="task-content">
//                     <div class="task">${taskText}</div>
//                     <div class="actions">
//                         <button class="btn btn-success">✔</button>
//                         <button class="btn btn-danger">✖</button>
//                     </div>
//                 </div>
//             `;
//             taskList.appendChild(newTask);
//             taskInput.value = '';
//         }
//     });

//     taskList.addEventListener('click', (event) => {
//         if (event.target.classList.contains('btn-danger')) {
//             event.target.closest('li').remove();
//         } else if (event.target.classList.contains('btn-success')) {
//             event.target.closest('li').querySelector('.task').classList.toggle('completed');
//         }
//     });

//     taskInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             addButton.click();
//         }
//     });
// });


    // Массив для хранения задач: [{ text: "Задача", completed: false }, ...]
    let tasks = [];

    const addButton = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // При загрузке страницы загружаем задачи из localStorage
    document.addEventListener('DOMContentLoaded', () => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
      }
      renderTasks();
    });

    // Обработчик для кнопки "Добавить задачу"
    addButton.addEventListener('click', () => {
      addTask();
    });

    // Добавление задачи при нажатии Enter
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });

    // -----------------------------
    //         ФУНКЦИИ
    // -----------------------------

    // Добавить новую задачу
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

    // Отрисовать (обновить) список задач
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

        // Кнопки "Завершить" и "Удалить"
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

    // Переключить состояние "выполнено / не выполнено"
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    // Удалить задачу
    function removeTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    // Сохранить задачи в localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  



