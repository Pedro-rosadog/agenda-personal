const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const themeBtn = document.getElementById("toggle-theme");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed);
      return matchesSearch && matchesFilter;
    })
    .forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task" + (task.completed ? " completed" : "");
      taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small>Vence: ${task.dueDate}</small>
        <div class="actions">
          <button aria-label="Completar" onclick="toggleComplete(${index})">✔</button>
          <button aria-label="Editar" onclick="editTask(${index})">✏️</button>
          <button aria-label="Eliminar" onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      taskList.appendChild(taskDiv);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("due-date").value;

  if (!title || !description || !dueDate) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  tasks.push({ title, description, dueDate, completed: false });
  saveTasks();
  renderTasks();
  form.reset();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("¿Eliminar esta tarea?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("due-date").value = task.dueDate;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

themeBtn.addEventListener("click", toggleTheme);
searchInput.addEventListener("input", renderTasks);
filterSelect.addEventListener("change", renderTasks);

// Estado inicial
if (darkMode) document.body.classList.add("dark");
renderTasks();
