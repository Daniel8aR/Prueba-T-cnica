// src/types/Task.ts
import { Tag } from './Tag';

// Se define la interfaz Task, que representa una tarea en la aplicación.
export interface Task {
  // Cada tarea tiene un id único, un título descriptivo, una descripción opcional, un estado de completado, una fecha de vencimiento opcional,
  // coordenadas de ubicación opcionales y una lista de etiquetas asociadas.
  id: number;
  title: string;
  // A partir de description, se utilizan los ? para indicar que estas propiedades son opcionales, }
  // lo que significa que una tarea puede no tener estas propiedades sin causar errores en el código.
  description?: string;
  completed: boolean;
  dueDate?: string;
  latitude?: number;
  longitude?: number;
  tags?: Tag[];
}
