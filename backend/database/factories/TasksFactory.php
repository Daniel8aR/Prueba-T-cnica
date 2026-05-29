<?php

namespace Database\Factories;

use App\Models\Tasks;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tasks>
 */
class TasksFactory extends Factory
{
    protected $model = Tasks::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'titulo' => $this->faker->sentence(3),
            'descripcion' => $this->faker->paragraph(),
            'completada' => false,
            'fecha_limite' => now()->addDays(5),
            'latitud' => null,
            'longitud' => null,
        ];
    }
}
