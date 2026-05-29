<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\User\RegisterUserRequest;
use App\Http\Requests\User\LoginUserRequest;
use App\Http\Requests\User\UploadAvatarRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    // Registrar un nuevo usuario
    public function register(RegisterUserRequest $request){
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

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
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
            ],
            'token' => $token, 
        ], 200);
    }
    
    // Cerrar sesión del usuario autenticado
    public function logOut(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully',
        ], 202);
    }
    
    // Obtener información del usuario autenticado
    public function me(Request $request){
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
            ]
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
        // Actualizar el campo avatar en la base de datos
        $user->avatar = $path;
        $user->avatar_exif = $exif ? json_encode($exif) : null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Avatar uploaded successfully',
            'avatar_url' => asset('storage/'.$path),
        ], 201);
    }
    
    // Eliminar un usuario por id
    public function delete(String $id){
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);
        
        $user->delete();
        return response()->json([
            'success' => true,
            'message' => 'User deleted'
        ], 200);
    }
}