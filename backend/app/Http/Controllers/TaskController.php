<?php
namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Requests\Task\ToggleTaskRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Services\TaskService; 

class TaskController extends Controller {
    protected $taskService;

    public function __construct(TaskService $taskService) {
        $this->taskService = $taskService;
    }

    // Obtener todas las tareas del usuario autenticado
    public function tasks(Request $request){
        $tasks = $this->taskService->tasks($request->user());
        return response()->json($tasks, 200);
    }

    // Crear una nueva tarea para el usuario autenticado
    public function createTask(CreateTaskRequest $request){
        $validated = $request->validated();
        
        // Convertir fecha automáticamente
        if (!empty($validated['fecha_limite'])) {
            try {
                $validated['fecha_limite'] =
                    Carbon::parse($validated['fecha_limite'])->format('Y-m-d');
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Invalid date format',
                    'error' => $e->getMessage(),
                ], 422);
            }
        }

        $validated['user_id'] = $request->user()->id;
        $task = $this->taskService->createTask($validated);

        return response()->json([
            'task' => $task,
            'message' => 'Task created successfully',
        ], 201);
    }

    // Obtener una tarea por id del usuario autenticado
    public function getTask(Request $request, String $id){
        $task = $this->taskService->getTask($request->user(), $id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        if ($task === 'forbidden') return response()->json(['message' => 'Forbidden'], 403);

        return response()->json([
            'task' => $task,
            'message' => 'Task found',
        ], 200);
    }
    
    // Actualizar una tarea por id del usuario autenticado
    public function updateTask(UpdateTaskRequest $request, String $id){
        $task = $this->taskService->updateTask($request->validated(), $id);

        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        
        return response()->json([
            'task' => $task,
            'message' => 'Task updated successfully',
        ], 200);
    }
    
    // Eliminar una tarea por id del usuario autenticado
    public function deleteTask(Request $request, String $id) {
        $task = $this->taskService->deleteTask($request->user(), $id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        if ($task === 'Forbidden') return response()->json(['message' => 'Forbidden'], 403);

        return response()->json([
            'message' => 'Task deleted'
        ], 200);
    }

    // Sincronizar o eliminar etiquetas de una tarea por id del usuario autenticado
    public function toggleTask(ToggleTaskRequest $request, String $id) {
        $task = $this->taskService->toggleTask($request->validated()['tags'], $id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        return response()->json([
            'message' => $task['message'],
            'task' => $task['task'],
        ], 200);
    }

    // Eliminar una etiqueta específica de una tarea por id del usuario autenticado
    public function deleteTaskTag(Request $request, String $id, String $tagId){
        $result = $this->taskService->deleteTaskTag($request->user(), $id, $tagId);
        if (!$result) return response()->json(['message' => 'Task not found'], 404);
        if ($result === 'Forbidden') return response()->json(['message' => 'Forbidden'], 403);

        return response()->json([
            'message' => 'Tag detached successfully',
            'tags' => $result,
        ], 200);
    }
}
// 