<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TagController;

// Rutas para la gestión de usuarios
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logOut'])->middleware('auth:sanctum');
Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');
Route::post('/me/avatar', [UserController::class, 'uploadAvatar'])->middleware('auth:sanctum');
Route::get('/me/avatar', [UserController::class, 'getAvatar'])->middleware('auth:sanctum');
Route::delete('/delete/{id}', [UserController::class, 'delete']);

// Rutas para la gestión de tareas
Route::get('/tasks', [TaskController::class, 'tasks'])->middleware('auth:sanctum');
Route::post('/tasks', [TaskController::class, 'createTask'])->middleware('auth:sanctum');
Route::get('/tasks/{id}', [TaskController::class, 'getTask'])->middleware('auth:sanctum');
Route::put('/tasks/{id}', [TaskController::class, 'updateTask'])->middleware('auth:sanctum');
Route::delete('/tasks/{id}', [TaskController::class, 'deleteTask'])->middleware('auth:sanctum');
Route::post('/tasks/{id}/tags', [TaskController::class, 'toggleTask'])->middleware('auth:sanctum');
Route::delete('/tasks/{id}/tags/{tagId}', [TaskController::class, 'deleteTaskTag'])->middleware('auth:sanctum');

// Rutas para la gestión de etiquetas
Route::get('/tags', [TagController::class, 'tags']); 
Route::post('/tags', [TagController::class, 'createTag']);
Route::delete('/tags/{id}', [TagController::class, 'deleteTag']);

// 