// script.js

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
    const taskList = document.getElementById("task-list");
    if (!taskList) return;
    taskList.innerHTML = "";

    tasks.filter(task => !filter || task.category === filter).forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <strong>${task.title}</strong>
            <small>Category: ${task.category}</small>
            <p>${task.description}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addOrUpdateTask(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    const newTask = { title, category, description };

    if (editingTaskId !== null) {
        tasks[editingTaskId] = newTask;
        editingTaskId = null;
    } else {
        tasks.push(newTask);
    }

    saveTasks();
    renderTasks(document.getElementById("filter-category").value);
    document.getElementById("task-form").reset();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("title").value = task.title;
    document.getElementById("category").value = task.category;
    document.getElementById("description").value = task.description;
    editingTaskId = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(document.getElementById("filter-category").value);
}

document.getElementById("task-form")?.addEventListener("submit", addOrUpdateTask);
document.getElementById("filter-category")?.addEventListener("change", (e) => {
    renderTasks(e.target.value);
});

renderTasks();