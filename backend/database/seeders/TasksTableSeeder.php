<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tasks;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tasks::factory()->create([
            'user_id' => 1,
            'titulo' => 'Configurar servidor Laravel',
            'descripcion' => 'Instalar dependencias y configurar .env',
            'completada' => false,
            'fecha_limite' => now()->addDays(7),
            'latitud' => null,
            'longitud' => null,
        ]);

        Tasks::factory()->create([
            'user_id' => 1,
            'titulo' => 'Revisar autenticación',
            'descripcion' => 'Probar login y registro con Postman',
            'completada' => false,
            'fecha_limite' => now()->addDays(3),
            'latitud' => null,
            'longitud' => null,
        ]);
    }
}
