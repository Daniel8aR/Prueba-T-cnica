<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tags;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tags::factory()->create([
            'nombre' => 'Urgente',
            'color' => '#FF0000',
        ]);

        Tags::factory()->create([
            'nombre' => 'Personal',
            'color' => '#00FF00',
        ]);

        Tags::factory()->create([
            'nombre' => 'Trabajo',
            'color' => '#0000FF',
        ]);
    }
}
