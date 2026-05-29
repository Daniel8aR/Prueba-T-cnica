# API REST de Tareas Personales (Laravel 12 + PostgreSQL)
Construcción de una API mediante Laravel para gestionar tareas personales de diferentes personas. En el backend, es posible gestionar los datos personales de los usuarios como el nombre, correo y un avatar. 
Al mismo tiempo, las tareas personales para cada usuario, en los cuales se puede crear o actualizar una tarea, cuyos datos son el título de la tarea, su descripción, una fecha límite y unas etiquetas indicando de qué tipo era la tarea. 


## Requisitos
- PHP 8.2+
- Composer
- PostgreSQL
- Node.js & npm (opcional para frontend)
- Postman (para pruebas)


## Instalación
1. Clonar Repositorio: 
# git clone https://gitlab.com/Daniel8aR/prueba-tecnica-api-rest-con-laravel-12.git backend

2. Ir a la carpeta del repositorio clonado
# cd backend

3. Instalar dependencias
# composer install 

4. Generar llave
# cp .env.example .env 
y después: 
# php artisan key:generate 


## onfigurar variables en .env:
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=prueba
DB_USERNAME=usuaro
DB_PASSWORD=contraseña


## Ejecutar migraciones y seeders
# php artisan migrate --seed


## Enlazar el archivo storage públicamente
# php artisan storage:link


## Montar servidor local
Levantar el servidor de desarrollo: 
# php artisan serve
La API estará disponible en: https://throat-agreeing-thirsting.ngrok-free.dev


## Endpoints principales
Usuarios: registro, login, logout, perfil, avatar.
Tareas: CRUD completo + asignación de tags.
Tags: CRUD básico.

La colección Postman incluida en el repo cubre todos los endpoints con ejemplos.
