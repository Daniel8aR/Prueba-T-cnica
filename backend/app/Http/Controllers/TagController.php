<?php
namespace App\Http\Controllers;

use App\Http\Requests\Tag\CreateTagRequest;
use App\Services\TagService;

class TagController extends Controller {
    protected $tagService;

    public function __construct(TagService $tagService) {
        $this->tagService = $tagService;
    }

    // Obtener todas las etiquetas
    public function tags(){
        $tags = $this->tagService->getAllTags();
        return response()->json($tags, 200);
    }

    // Crear una nueva etiqueta
    public function createTag(CreateTagRequest $request){
        $validated = $request->validated();

        $tag = $this->tagService->createTag($validated);

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
        $result = $this->tagService->deleteTag($id);
        if (!$result) return response()->json(['message' => 'Tag not found'], 404);

        return response()->json([
            'message' => 'Tag deleted'
        ], 200);
    }
}
