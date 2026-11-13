const formulario = document.getElementById('formularioActividad');
const tabla = document.getElementById('tablaActividades');
const mensaje = document.getElementById('mensaje');



async function cargarActividades() {

    try {
        const respuesta = await fetch('/actividades');

        const actividades = await respuesta.json();

        tabla.innerHTML = '';

        actividades.forEach(actividad => {

            const fila = document.createElement('tr');

         
            const columnaId = document.createElement('td');
            columnaId.textContent = actividad.id;

           
            const columnaNombre = document.createElement('td');
            columnaNombre.textContent = actividad.nombre;

            
            const columnaMateria = document.createElement('td');
            columnaMateria.textContent = actividad.materia;

            
            const columnaEstado = document.createElement('td');

            const selectorEstado = document.createElement('select');

            const estados = ['Pendiente', 'En proceso', 'Completada'];

            estados.forEach(estado => {
                const opcion = document.createElement('option');
                opcion.value = estado;
                opcion.textContent = estado;

                if (actividad.estado === estado) {
                    opcion.selected = true;
                }

                selectorEstado.appendChild(opcion);
            });

            selectorEstado.addEventListener('change', () => {
                modificarActividad(actividad.id, selectorEstado.value);
            });

            columnaEstado.appendChild(selectorEstado);

          
            const columnaPrioridad = document.createElement('td');
            columnaPrioridad.textContent = actividad.prioridad;

            
            const columnaAcciones = document.createElement('td');

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarActividad(actividad.id);
            });

            columnaAcciones.appendChild(botonEliminar);

           
            fila.appendChild(columnaId);
            fila.appendChild(columnaNombre);
            fila.appendChild(columnaMateria);
            fila.appendChild(columnaEstado);
            fila.appendChild(columnaPrioridad);
            fila.appendChild(columnaAcciones);

            
            tabla.appendChild(fila);

        });

    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error al cargar las actividades';
    }
}



formulario.addEventListener('submit', async function(evento) {

    evento.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const materia = document.getElementById('materia').value;
    const prioridad = document.getElementById('prioridad').value;

    const actividad = {
        nombre: nombre,
        materia: materia,
        prioridad: prioridad
    };

    try {
        const respuesta = await fetch('/actividades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actividad)
        });

        if (!respuesta.ok) {
            const error = await respuesta.text();
            mensaje.textContent = error;
            return;
        }

        mensaje.textContent = 'Actividad registrada correctamente';

        formulario.reset();

        cargarActividades();

    } catch (error) {
        console.error(error);
        mensaje.textContent = 'Error al registrar la actividad';
    }

});


async function modificarActividad(id, estado) {

    try {
        const respuesta = await fetch(`/actividades/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: estado
            })
        });

        if (!respuesta.ok) {
            alert('No se pudo modificar el estado');
            return;
        }

        cargarActividades();

    } catch (error) {
        console.error(error);
        alert('Error al modificar la actividad');
    }
}



async function eliminarActividad(id) {

    const confirmar = confirm('¿Estás seguro de eliminar esta actividad?');

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`/actividades/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            alert('No se pudo eliminar la actividad');
            return;
        }

        mensaje.textContent = 'Actividad eliminada correctamente';

        cargarActividades();

    } catch (error) {
        console.error(error);
        alert('Error al eliminar la actividad');
    }
}



cargarActividades();