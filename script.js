document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do Local Storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => addTaskToList(task));

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = { text: taskText, completed: false };
            addTaskToList(newTask);
            saveTask(newTask);
            taskInput.value = '';
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTask(this)">Completar</button>
            <button onclick="removeTask(this)">Remover</button>
        `;
        taskList.appendChild(li);
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.toggleTask = function(button) {
        const li = button.parentElement;
        li.classList.toggle('completed');
        updateTasks();
    }

    window.removeTask = function(button) {
        const li = button.parentElement;
        taskList.removeChild(li);
        updateTasks();
    }

    function updateTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});