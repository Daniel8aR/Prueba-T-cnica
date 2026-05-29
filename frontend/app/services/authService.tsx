// frontend/src/api/authService.js
import api, { setAuthToken } from './api';

// Función para registrar un nuevo usuario
export const register = async (name: string, email: string, password: string) => {
  try {
    // Se llama a la api para registrar al usuario con los datos proporcionados
    const response = await api.post('/register', { name, email, password });
    return response;
  } catch (err: any) {
    // Capturar el error y devolver la respuesta del backend
    if (err.response) return err.response; // contiene { success: false, message: "Invalid credentials" }
    throw err; // otro error (red, servidor caído, etc.)
  }
}

// Función para iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    // Se llama a la api para autenticar al usuario con los datos proporcionados
    const res = await api.post("/login", { email, password });
    // Si la autenticación es exitosa, se establece el token de autenticación para futuras solicitudes
    if (res.data.success) 
      // setAuthToken se encuentra en api.tsx y se encarga de almacenar el token y agregarlo a las cabeceras de las solicitudes
      setAuthToken(res.data.token); 

    return res;
  } catch (err: any) {
    // Capturar el error y devolver la respuesta del backend
    if (err.response)
      // contiene { success: false, message: "Invalid credentials" } 
      return err.response; 
    throw err; // otro error (red, servidor caído, etc.)
  }
};

// Función para cerrar sesión
export const logOut = async () => {
  // Se llama a la api para cerrar sesión
  const response = await api.post('/logout');
  return response;
}

// Función para obtener los datos del usuario autenticado
export const me = async () => {
  const response = await api.get('/me');
  return response;
}

// Función para actualizar el avatar del usuario
export const uploadAvatar = async (formData: FormData) => {
  try {
    // Se llama a la api para subir el avatar del usuario con los datos proporcionados
    const response = await api.post('/me/avatar', formData, {
      // Especificamos que el contenido es multipart/form-data para subir archivos
      headers: {
        // Content-Type se establece automáticamente por el navegador al usar FormData, pero lo incluimos explícitamente para mayor claridad
        // multipart/form-data se usa para que el backend pueda procesar correctamente el archivo enviado
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (err: any) {
    // Capturar el error y devolver la respuesta del backend
    if (err.response)
      return err.response; // contiene { success: false, message: "Invalid credentials" }
    throw err; // otro error (red, servidor caído, etc.)
  }
}
