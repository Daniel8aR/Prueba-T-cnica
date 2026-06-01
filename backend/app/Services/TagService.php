<?php
namespace App\Services;

use App\Models\Tags;

class TagService {
    // Obtener todas las etiquetas
    public function getAllTags(){
        return Tags::all();
    }

    // Crear nueva etiqueta
    public function createTag(array $data){
        return Tags::create($data);
    }

    // Eliminar etiqueta por id
    public function deleteTag(string $id){
        $tag = Tags::find($id);
        if (!$tag) return null;

        $tag->delete();
        return true;
    }
}