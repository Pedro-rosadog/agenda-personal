function agregarTarea() {
  const input = document.getElementById('nueva-tarea');
  const tarea = input.value.trim();
  if (tarea === '') {
    alert('Por favor, escribe una tarea.');
    return;
  }
  const lista = document.getElementById('lista-tareas');
  const li = document.createElement('li');
  li.textContent = tarea;

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.onclick = function () {
    lista.removeChild(li);
  };

  li.appendChild(btnEliminar);
  lista.appendChild(li);

  input.value = '';
  input.focus();
}
