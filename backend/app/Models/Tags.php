<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Tags extends Model {
    use HasFactory;

    protected $fillable = [
        'nombre',
        'color',
        'created_at',
        'updated_at',
    ];

    public function taks() {
        return $this->belongsToMany(Tasks::class, 'task_tags', 'tag_id', 'task_id');
    }
}
// 