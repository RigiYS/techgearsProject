<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Smartphones',
                'slug' => 'smartphones',
                'description' => 'Latest smartphones and mobile devices',
                'is_active' => true,
            ],
            [
                'name' => 'Laptops',
                'slug' => 'laptops',
                'description' => 'Laptops and notebooks for work and gaming',
                'is_active' => true,
            ],
            [
                'name' => 'Tablets',
                'slug' => 'tablets',
                'description' => 'Tablets and iPad devices',
                'is_active' => true,
            ],
            [
                'name' => 'Audio',
                'slug' => 'audio',
                'description' => 'Headphones, speakers, and audio equipment',
                'is_active' => true,
            ],
            [
                'name' => 'Cameras',
                'slug' => 'cameras',
                'description' => 'Digital cameras and photography equipment',
                'is_active' => true,
            ],
            [
                'name' => 'Gaming',
                'slug' => 'gaming',
                'description' => 'Gaming consoles and accessories',
                'is_active' => true,
            ],
            [
                'name' => 'Wearables',
                'slug' => 'wearables',
                'description' => 'Smartwatches and fitness trackers',
                'is_active' => true,
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Cases, chargers, and other accessories',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
