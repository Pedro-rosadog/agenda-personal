// Cargar tareas al iniciar
document.addEventListener("DOMContentLoaded", mostrarTareas);

function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const tarea = input.value.trim();

  if (tarea === "") {
    alert("Por favor, escribe una tarea.");
    return;
  }

  const tareas = obtenerTareas();
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  input.value = "";
  mostrarTareas();
}

function eliminarTarea(index) {
  const tareas = obtenerTareas();
  tareas.splice(index, 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}

function obtenerTareas() {
  const tareasGuardadas = localStorage.getItem("tareas");
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

function mostrarTareas() {
  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = "";
  const tareas = obtenerTareas();

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = tarea;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarTarea(index);

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}
