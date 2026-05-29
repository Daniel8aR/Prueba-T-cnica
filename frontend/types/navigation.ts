import { Task } from "./Task";

// types/navigation.ts

// Se define el tipo NavigationParams, que representa los parámetros de las rutas en la aplicación. 
// Cada propiedad del tipo corresponde a una ruta en la aplicación, y su valor indica los parámetros que se esperan para esa ruta. 
export type NavigationParams = {
  // La ruta Task espera un parámetro opcional task de tipo Task, que se utiliza para pasar la tarea que se va a editar.
  // El ? indica que el parámetro task es opcional, lo que significa que la ruta Task se puede navegar tanto para crear una nueva tarea (sin pasar ningún parámetro) 
  // como para editar una tarea existente (pasando un objeto Task).
  Task: { task?: Task };
};
