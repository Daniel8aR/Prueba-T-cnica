// types/Item.ts
import { Task } from '@/types/Task';

// Define the props for the TaskComponent
// Con el proposito de que el componente sea reutilizable, 
// se le puede pasar una función onDeleted que se ejecutará después de eliminar la tarea, 
// para que el componente padre pueda actualizar su estado o realizar alguna acción adicional.
export interface TaskInterface {
  task: Task;
  onDeleted?: () => void; 
}
