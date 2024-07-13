<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            [
                'username' => 'admin',
                'name' => 'JEZEL ZAPANTA',
                'sex' => 'MALE',
                'email' => 'admin@publication.org',
                'password' => Hash::make('1'),
                'role' => 'ADMINISTRATOR',
            ],
           
        ];

        \App\Models\User::insertOrIgnore($users);
    }
}
