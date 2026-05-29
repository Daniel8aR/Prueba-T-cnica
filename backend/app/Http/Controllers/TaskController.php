<?php
namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Requests\Task\ToggleTaskRequest;
use App\Models\Tasks;
use Illuminate\Http\Request;
use \App\Models\Tags;
use Carbon\Carbon;

class TaskController extends Controller {
    // Obtener todas las tareas del usuario autenticado
    public function tasks(Request $request){
        $user = $request->user();
        $tasks = $user->tasks()->with('tags')->get();

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
        $task = Tasks::create($validated);

        return response()->json([
            'task' => $task,
            'message' => 'Task created successfully',
        ], 201);
    }

    // Obtener una tarea por id del usuario autenticado
    public function getTask(Request $request, String $id){
        $task = Tasks::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        if ($task->user_id !== $request->user()->id)
            return response()->json(['message'=>'Forbidden'],403);

        return response()->json([
            'message' => 'Task found',
            'task' => $task
        ], 200);
    }
    
    // Actualizar una tarea por id del usuario autenticado
    public function updateTask(UpdateTaskRequest $request, String $id){
        $task = Tasks::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);
        
        $validated = $request->validated();

        $task->update($validated);
        
        return response()->json([
            'task' => $task,
            'message' => 'Task updated successfully',
        ], 200);
    }
    
    // Eliminar una tarea por id del usuario autenticado
    public function deleteTask(Request $request, String $id) {
        $task = Tasks::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        if ($task->user_id !== $request->user()->id)
            return response()->json(['message'=>'Forbidden'],403);

        $task->delete();
        return response()->json([
            'message' => 'Task deleted'
        ], 200);
    }

    // Sincronizar o eliminar etiquetas de una tarea por id del usuario autenticado
    public function toggleTask(ToggleTaskRequest $request, String $id) {
        $task = Tasks::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        $validated = $request->validated();

        if (empty($validated['tags'])) 
            $task->tags()->detach();
        else 
            $task->tags()->sync($validated['tags']);

        $task->load('tags');

        return response()->json([
            'message' => empty($validated['tags']) 
                ? 'All tags detached successfully' 
                : 'Tags synced successfully',
            'task' => $task,
        ], 200);
    }

    // Eliminar una etiqueta específica de una tarea por id del usuario autenticado
    public function deleteTaskTag(Request $request, String $id, String $tagId){
        $task = Tasks::find($id);
        if (!$task) return response()->json(['message' => 'Task not found'], 404);

        $tag = Tags::find($tagId);
        if (!$tag) return response()->json(['message' => 'Tag not found'], 404);

        if ($task->user_id !== $request->user()->id)
            return response()->json(['message'=>'Forbidden'],403);

        $task->tags()->detach($tagId);
        $task->load('tags');

        return response()->json([
            'message' => 'Tag detached successfully',
            'tags' => $task->tags,
        ], 200);
    }
}
// 