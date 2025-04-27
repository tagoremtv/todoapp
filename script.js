let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((t, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${t.completed ? 'line-through' : 'none'}">${t.text}</span>
            <button onclick="toggleTask(${index})">Done</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    if (input.value.trim() !== '') {
        tasks.push({ text: input.value, completed: false });
        input.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

document.getElementById('taskForm').addEventListener('submit', addTask);
renderTasks();
