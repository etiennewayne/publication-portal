<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'category' => 'News',
                'active' => 1
            ],
            [
                'category' => 'Sports',
                'active' => 1

            ],
            [
                'category' => 'Editorial',
                'active' => 1

            ],
            [
                'category' => 'Feature',
                'active' => 1

            ],
            [
                'category' => 'Literary',
                'active' => 1

            ],
            [
                'category' => 'Science and Tech',
                'active' => 1

            ],
        ];

        \App\Models\Category::insertOrIgnore($data);
    }
}
