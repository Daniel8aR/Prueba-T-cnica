<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService {
    public function register(array $data) {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [$user, $token];
    }
    
    public function login(array $data){
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password))
            return null; // credenciales inválidas

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
            ],
            'token' => $token,
        ];
    }
    
    public function logOut(User $user){
        $user()->currentAccessToken()->delete();
    }
    
    public function me(User $user){
        return [
            'id'=>$user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar ? asset('storage/'.$user->avatar) : null,
        ];
    }
    
    public function uploadAvatar(User $user, string $path, $exif = null){
        // Actualizar el campo avatar en la base de datos
        $user->avatar = $path;
        $user->avatar_exif = $exif ? json_encode($exif) : null;
        $user->save();

        return [
            'avatar_url' => asset('storage/'.$path),
        ];
    }
    
    public function delete(string $id){
        $user = User::find($id);
        if (!$user) return null; 

        $user->delete(); 
        return true; 
    }
}