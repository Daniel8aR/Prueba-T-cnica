// services/notification.tsx
// Este archivo define la función notification, que se encarga de programar notificaciones para las tareas que están próximas a vencer. 
// Utiliza la biblioteca expo-notifications para manejar las notificaciones en una aplicación React Native.
import * as Notifications from "expo-notifications";
import { Task } from "@/types/Task";

// Se establece un manejador de notificaciones para configurar cómo se deben mostrar las notificaciones cuando se reciben.
Notifications.setNotificationHandler({
  // handleNotification es una función asíncrona que devuelve un objeto con las propiedades shouldShowBanner.
  // Es asincrona porque en algunos casos, como cuando se necesitan permisos o se realizan operaciones de red, puede requerir tiempo para completarse.
  handleNotification: async () => ({
    // shouldShowBanner se establece en true para indicar que se debe mostrar un banner de notificación cuando se recibe una notificación.
    // Un banner es una notificación que aparece en la parte superior de la pantalla y se muestra brevemente antes de desaparecer automáticamente. 
    // Al establecer shouldShowBanner en true, se asegura que los usuarios vean la notificación incluso si no están interactuando activamente con la aplicación en ese momento.
    shouldShowBanner: true,
    // shouldShowList se establece en true para indicar que la notificación también debe aparecer en la lista de notificaciones del sistema, 
    // Así se permite a los usuarios verla incluso después de que el banner haya desaparecido.
    shouldShowList: true,
    // shouldPlaySound se establece en true para indicar que se debe reproducir un sonido cuando se recibe una notificación.
    shouldPlaySound: true,
    // shouldSetBadge se establece en false para evitar actualizar el contador de notificaciones (badge) en el ícono de la aplicación cuando se recibe una notificación.
    shouldSetBadge: false,
  }),
}); 

// La función notification toma un array de tareas (tasks) y programa una notificación para cada tarea que esté próxima a vencer
export const notification = async (tasks: Task[]) => {
  // Se obtiene la fecha y hora actual para comparar con las fechas de vencimiento de las tareas.
  const now = new Date();
  
  // Se itera sobre cada tarea en el array tasks para verificar si tiene una fecha de vencimiento (dueDate) y programar una notificación si es necesario.
  for (const task of tasks) {
    // Si la tarea no tiene una fecha de vencimiento, se omite y se continúa con la siguiente tarea en el ciclo.
    if (!task.dueDate) continue;

    // Se crea un objeto Date a partir de la fecha de vencimiento de la tarea (task.dueDate) para poder manipularla y compararla con la fecha actual.
    const dueDate = new Date(task.dueDate);
    // Se crea una nueva fecha con la misma fecha que dueDate para calcular después la fecha de notificación 
    const notifyDate = new Date(dueDate);
    // Se calcula la fecha de notificación restando 2 días a la fecha de vencimiento. 
    // Esto le dará a los usuarios un aviso previo antes de que la tarea venza.
    notifyDate.setHours(9, 0, 0, 0);

    const diffDays = Math.ceil(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Solo notificar si faltan 2 días o menos
    if (diffDays < 0) continue;

    // Se programa una notificación utilizando Notifications.scheduleNotificationAsync() con el contenido de la notificación
    await Notifications.scheduleNotificationAsync({
      // El contenido de la notificación incluye un título, un cuerpo y un sonido cuando se reciba la notificación.
      content: {
        title: "⏱️ Tarea por vencer",
        // En el body, se usa la función toLocaleDateString() para formatear la fecha de vencimiento (dueDate) en un formato legible para el usuario
        // Mostrando solo la fecha sin la hora.
        body: `La tarea "${task.title}" vence el ${dueDate.toLocaleDateString()}`,
        sound: true,
      },
      // El trigger que indica cuándo se debe mostrar la notificación.
      trigger: {
        // El date se establece en notifyDate, que es la fecha calculada para notificar al usuario 2 días antes de la fecha de vencimiento de la tarea.
        date: notifyDate,
        // channelId se establece en "default" para especificar que la notificación debe usar el canal de notificaciones predeterminado del sistema.
        channelId: "default",
      },
    });
  }
};
