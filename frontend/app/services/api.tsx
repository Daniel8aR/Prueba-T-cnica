// api.js
// La configuración de Axios para la comunicación con el backend
import axios from 'axios';

// La constante 'api' es una instancia de Axios configurada con la URL base del backend.
const api = axios.create({
  // La url base es la dirección del servidor backend.
  baseURL: 'https://throat-agreeing-thirsting.ngrok-free.dev/api', // cambia según tu servidor
});

// Variable para almacenar el token de autenticación
let authToken: string | null = null;
// Función para establecer el token de autenticación
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Interceptor de solicitud para agregar el token de autenticación a cada solicitud
// Funciona antes de que se envíe cada solicitud, verificando si hay un token de autenticación y, si es así, lo agrega a los encabezados de la solicitud.
// Por ejemplo, si al crear una tarea, se requiere autenticación
// El token se incluirá automáticamente en la solicitud, permitiendo al backend verificar la identidad del usuario y autorizar la acción.
api.interceptors.request.use(
  // config es la configuración de la solicitud que se va a enviar al backend. Si authToken tiene un valor (es decir, no es null), se agrega un encabezado Authorization con el formato Bearer seguido del token.
  (config) => {
    // Si authToken tiene un valor, se agrega al encabezado Authorization de la solicitud.
    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
    // Se devuelve la configuración de la solicitud, que ahora incluye el token de autenticación si estaba disponible. 
    // Esto permite que todas las solicitudes realizadas con esta instancia de Axios incluyan automáticamente el token de autenticación, facilitando la comunicación segura con el backend.
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
