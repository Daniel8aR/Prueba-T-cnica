// src/constants/taskCategories.ts
import { Item } from "@/types/Item";

// Se define un array de objetos que representan las categorías de tareas disponibles en la aplicación.
// Cada objeto tiene una propiedad key, que es un número único que identifica la categoría, y una propiedad value, que es una cadena de texto que describe la categoría.
export const data: Item[] = [
        // La key 1 corresponde a la categoría "Personal", la key 2 a "Privado" y la key 3 a "Trabajo".
        {key:1, value:'Personal'}, 
        {key:2, value:'Privado'},
        {key:3, value:'Trabajo'},
]