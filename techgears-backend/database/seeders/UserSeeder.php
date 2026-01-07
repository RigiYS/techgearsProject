<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin TechGears',
            'email' => 'admin@techgears.com',
            'password' => Hash::make('password'),
            'phone' => '+6281234567890',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Seller
        User::create([
            'name' => 'Seller TechGears',
            'email' => 'seller@techgears.com',
            'password' => Hash::make('password'),
            'phone' => '+6281234567891',
            'role' => 'seller',
            'email_verified_at' => now(),
        ]);

        // Customer
        User::create([
            'name' => 'John Doe',
            'email' => 'customer@techgears.com',
            'password' => Hash::make('password'),
            'phone' => '+6281234567892',
            'role' => 'customer',
            'email_verified_at' => now(),
        ]);
    }
}
