// frontend/src/api/taskService.js
import api from './api';

// Función asíncrona para obtener la lista de tareas desde el backend.
export const getTasks = async () => {
  try {
    // Realiza una solicitud GET a la ruta '/tasks' para obtener las tareas.
    const response = await api.get('/tasks');
    return response;
  } catch (err: any) {
    if (err.response)
      return err.response;
    throw err; 
  }
}

// Función asíncrona para obtener los detalles de una tarea específica por su ID.
export const createTask = async (taskData: any) => {
  try {
    // Realiza una solicitud POST a la ruta '/tasks' para crear una nueva tarea.
    const response = await api.post('/tasks', taskData);
    return response;
  } catch (err: any) {
    if (err.response)
      return err.response;
    throw err;
  }
}

// Función asíncrona para actualizar una tarea existente por su ID.
export const updateTask = async (id: number, taskData: any) => {
  try {
    // Realiza una solicitud PUT a la ruta '/tasks/{id}' para actualizar la tarea con el ID especificado.
    const response = await api.put(`/tasks/${id}`, taskData);
    return response;
  } catch (err: any) {
    if (err.response)
      return err.response;
    throw err;
  }
}

// Función asíncrona para eliminar una tarea por su ID.
export const deleteTask = async (id: number) => {
  try {
    // Realiza una solicitud DELETE a la ruta '/tasks/{id}' para eliminar la tarea con el ID especificado.
    const response = await api.delete(`/tasks/${id}`);
    return response;
  } catch (err: any) {
    if (err.response)
      return err.response;
    throw err;
  }
}

// Función asíncrona para asociar o desasociar etiquetas a una tarea por su ID.
export const toggleTask = async (id: string, tags: number[]) => {
  try {
    // Realiza una solicitud POST a la ruta '/tasks/{id}/tags' para actualizar las etiquetas asociadas a la tarea con el ID especificado.
    const response = await api.post(`/tasks/${id}/tags`, { tags });
    return response;
  } catch (err: any) {
    if (err.response)
      return err.response;
    throw err;
  }
}
