<?php
namespace App\Services;

use App\Models\User;
use App\Models\Tasks;

class TaskService {
    public function tasks(User $user){
        return $user->tasks()->with('tags')->get();
    }

    public function createTask(array $data){
        return Tasks::create($data);
    }

    public function getTask(User $user, string $id){
        $task = Tasks::find($id);
        if (!$task) return null;
        if ($task->user_id !== $user->id) return 'forbidden';
        return $task;
    }

    public function updateTask(array $data, string $id){
        $task = Tasks::find($id);
        if (!$task) return null;
        $task->update($data);

        return $task;
    }

    public function deleteTask(User $user, String $id){
        $task = Tasks::find($id);
        if (!$task) return null;
        if ($task->user_id !== $user->id) return 'Forbidden';
        $task->delete();
        return true;
    }
    
    public function toggleTask(array $tags, string $id){
        $task = Tasks::find($id);
        if (!$task) return null;

        if (empty($tags)) {
            $task->tags()->detach();
            $message = 'All tags detached successfully';
        } else {
            $task->tags()->sync($tags);
            $message = 'Tags synced successfully';
        }
        
        $task->load('tags');
        return [
            'task' => $task, 
            'message' => $message
        ];
    }

    public function deleteTaskTag(User $user, string $id, string $tagId){
        $task = Tasks::find($id);
        if (!$task) return null;
        if ($task->user_id !== $user->id) return 'Forbidden';

        $task->tags()->detach($tagId);
        $task->load('tags');
        return $task->tags;
    }
}