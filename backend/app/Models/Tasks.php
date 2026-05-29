<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Tasks extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'titulo',
        'descripcion',
        'completada',
        'fecha_limite',
        'latitud',
        'longitud',
        'created_at',
        'updated_at',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tags() {
        return $this->belongsToMany(Tags::class, 'task_tags', 'task_id', 'tag_id');
    }
}
// 