## Aplicación Móvil de Tareas Personales (React Native)
Construcción de una aplicación móvil multiplataforma (iOS y Android) que consume la API REST de Tareas Personales.
La app permite a los usuarios autenticarse, gestionar sus tareas y su perfil, incluyendo funcionalidades nativas como cámara, notificaciones y ubicación.


## Requisitos
- Node.js >= 18 (probado con v24.15.0)
- npm >= 9 (probado con v11.12.1)
- React Native CLI (incluido al crear el proyecto con `npx react-native init`)
- Android Studio con:
  - Android SDK Platform 33 (Android 16) recomendado
  - 'minSdkVersion' 21 (Android 5.0 Lollipop)
  - Emulador configurado o dispositivo físico con depuración USB
  - Dependencias necesarias en el SDK Manager:
    - Android SDK Platform-Tools (adb)
    - Android SDK Build-Tools
    - Android SDK Command-line Tools (latest)
    - Android Emulator
    - NDK (version 27.0.12077973)
    - CMake (última versión estable)
    - Google Play services
    - Google USB Driver


## Configuración adicional recomendada
1. Instalar JDK
  - Instalar JDK 11 o superior
  - Después, se tendrá que configurar la variable de entorno 'JAVA_HOME' apuntando al directorio del JDK.
    Por ejemplo: 'C:\Program Files\Java\jdk-17'.

2. Configurar ANDROID_HOME
  - Se debe crear la variable de entorno llamada 'ANDROID_HOME' apuntando al SDK de Android. 
    Por ejemplo: 'C:\Users\user\AppData\Local\Android\Sdk'.

3. Actualizar el PATH
  - En la variable de entorno 'Path' se tienen que agregar varias rutas:
    - %ANDROID_HOME%\platform-tools
    - %ANDROID_HOME%\emulator
    - %ANDROID_HOME%\tools


## Configuración en el dispositivo móvil
Si se va a correr la aplicación en un celular físico en lugar de un emulador, hay que seguir los siguientes pasos:
1. Activar opciones de desarrollador
  - En el dispositivo móvil, hay que ir a 'Configuración', luego a 'Acerca del teléfono' y después presionar 'Número de compilación'.
  - Después, habrá que presionar el Número de compilación 7 veces hasta que aparezca un mensaje que diga Ahora eres desarrollador.

2. Habilitar depuración USB
  - Una vez activadas las opciones de desarrollador, hay que entrar en ese menú y activar la opción 'Depuración USB'.
  - Esto permitirá que el dispositivo se comunique con la computadora mediante ADB.

3. Autorizar conexión ADB
  - Al conectar el celular por USB a la computadora, aparecerá un mensaje en el dispositivo solicitando autorización para la depuración.
  - Hay que aceptar la clave RSA para que el dispositivo quede registrado como confiable.

4. Verificación del dispositvo
  Para verificar que el emulador o dispositivo físico está bien conectado, simplemente en un powershell hay que ejuctar: 
  # adb devices


## Instalación
1. Clonar Repositorio: 
# git clone git@gitlab.com:Daniel8aR/prueba-tecnica-aplicacion-movil.git frontend

2. Ir a la carpeta del repositorio clonado
# cd frontend

3. Instalar dependencias
# npm install

## Configuración de la API
La conexión al backend está definida en 'src/api.js' usando Axios.  
En este archivo se encuentra la constante 'baseURL', que debe apuntar a la dirección pública del servidor:

El token de autenticación se gestiona con setAuthToken y se persiste en el dispositivo usando AsyncStorage.

## Funcionalidades
1. Login y registro: token persistente con AsyncStorage.
2. Lista de tareas: CRUD y marcado de completadas.
3. Crear/editar tarea: date picker, tags, ubicación.
4. Perfil de usuario: datos, avatar, logout.
5. Foto de perfil: cámara/galería, subida multipart/form-data.
6. Notificaciones locales: programadas 9:00 AM en fecha límite.
7. Ubicación: coordenadas opcionales al crear tarea.


## Generar APK de debug
Ir a la carpeta android:
# cd android

Luego ejecutar: 
# ./gradlew assembleDebug

Esto generará el APK en: 
# android/app/build/outputs/apk/debug/app-debug.apk

## Montar aplicación en el dispositivo
Conecte el dispositivo móvil a la pc con una usb. 
Una vez hecho, ejecute: 
# npm run android
