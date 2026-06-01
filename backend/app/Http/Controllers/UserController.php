<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\User\RegisterUserRequest;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\UploadAvatarRequest;
use App\Services\UserService; 

class UserController extends Controller {
    protected $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }
    
    // Registrar un nuevo usuario
    public function register(RegisterUserRequest $request){
        [$user, $token] = $this->userService->register($request->validated());

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token, 
        ], 201);
    }
    
    // Iniciar sesión de un usuario existente
    public function login(LoginUserRequest $request){
        $result = $this->userService->login($request->validated());

        if (!$result) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user' => $result['user'],
            'token' => $result['token'],
        ], 200);
    }
    
    // Cerrar sesión del usuario autenticado
    public function logOut(Request $request){
        $this->userService->logOut($request->user());

        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully',
        ], 202);
    }
    
    // Obtener información del usuario autenticado
    public function me(Request $request){
        $user = $this->userService->me($request->user());
        return response()->json([
            'success' => true,
            'user' => $user,
        ], 200);
    }

    // Subir o actualizar el avatar del usuario autenticado
    public function uploadAvatar(UploadAvatarRequest $request){
        // Validar el archivo usando
        $request->validated(); 
        
        // Guardar el archivo en storage/app/public/uploads
        $path = $request->file('avatar')->store('uploads', 'public');

        // Intentar leer EXIF solo si es JPEG/TIFF
        $exif = null;
        $extension = strtolower($request->file('avatar')->extension());
        if (in_array($extension, ['jpeg','jpg','tiff']))
            $exif = @exif_read_data($request->file('avatar')->getPathname());
        
        // Obtener el usuario autenticado gracias a Sanctum
        $user = $request->user();
        $result = $this->userService->uploadAvatar($user, $path, $exif);

        return response()->json([
            'success' => true,
            'message' => 'Avatar uploaded successfully',
            'avatar_url' => $result['avatar_url'],
        ], 201);
    }
    
    // Eliminar un usuario por id
    public function delete(String $id){
        $result = $this->userService->delete($id);
        if (!$result) return response()->json(['message' => 'User not found'], 404);
        
        return response()->json([
            'success' => true,
            'message' => 'User deleted'
        ], 200);
    }
}