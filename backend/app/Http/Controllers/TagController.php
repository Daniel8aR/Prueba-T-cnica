<?php
namespace App\Http\Controllers;
use App\Models\Tags;
use App\Http\Requests\Tag\CreateTagRequest;

class TagController extends Controller {
    // Obtener todas las etiquetas
    public function tags(){
        $tags = Tags::all();
        return response()->json($tags, 200);
    }

    // Crear una nueva etiqueta
    public function createTag(CreateTagRequest $request){
        $validated = $request->validated();

        $tag = Tags::create($validated);

        return response()->json([
            'tag' => [
                'id' => $tag->id,
                'nombre' => $tag->nombre,
                'color' => $tag->color,
                'created_at' => $tag->created_at,
                'updated_at' => $tag->updated_at,
            ]
        ], 201);
    }

    // Eliminar una etiqueta por id
    public function deleteTag(String $id){
        $tag = Tags::find($id);
        if (!$tag) return response()->json(['message' => 'Tag not found'], 404);
        
        $tag->delete();
        return response()->json([
            'message' => 'Tag deleted'
        ], 200);
    }
}
