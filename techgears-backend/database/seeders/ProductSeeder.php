<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Smartphones
            ['category_id' => 1, 'name' => 'iPhone 15 Pro Max', 'brand' => 'Apple', 'price' => 19999000, 'stock' => 50],
            ['category_id' => 1, 'name' => 'Samsung Galaxy S24 Ultra', 'brand' => 'Samsung', 'price' => 18999000, 'stock' => 45],
            ['category_id' => 1, 'name' => 'Google Pixel 8 Pro', 'brand' => 'Google', 'price' => 14999000, 'stock' => 30],
            
            // Laptops
            ['category_id' => 2, 'name' => 'MacBook Pro 16" M3', 'brand' => 'Apple', 'price' => 42999000, 'stock' => 25],
            ['category_id' => 2, 'name' => 'Dell XPS 15', 'brand' => 'Dell', 'price' => 24999000, 'stock' => 35],
            ['category_id' => 2, 'name' => 'ASUS ROG Zephyrus G14', 'brand' => 'ASUS', 'price' => 29999000, 'stock' => 20],
            
            // Tablets
            ['category_id' => 3, 'name' => 'iPad Pro 12.9"', 'brand' => 'Apple', 'price' => 18999000, 'stock' => 40],
            ['category_id' => 3, 'name' => 'Samsung Galaxy Tab S9', 'brand' => 'Samsung', 'price' => 12999000, 'stock' => 35],
            
            // Audio
            ['category_id' => 4, 'name' => 'Sony WH-1000XM5', 'brand' => 'Sony', 'price' => 5499000, 'stock' => 60],
            ['category_id' => 4, 'name' => 'AirPods Pro 2nd Gen', 'brand' => 'Apple', 'price' => 3699000, 'stock' => 80],
            ['category_id' => 4, 'name' => 'Bose QuietComfort 45', 'brand' => 'Bose', 'price' => 4999000, 'stock' => 50],
            
            // Cameras
            ['category_id' => 5, 'name' => 'Sony Alpha A7 IV', 'brand' => 'Sony', 'price' => 35999000, 'stock' => 15],
            ['category_id' => 5, 'name' => 'Canon EOS R6 Mark II', 'brand' => 'Canon', 'price' => 38999000, 'stock' => 12],
            
            // Gaming
            ['category_id' => 6, 'name' => 'PlayStation 5', 'brand' => 'Sony', 'price' => 7999000, 'stock' => 25],
            ['category_id' => 6, 'name' => 'Xbox Series X', 'brand' => 'Microsoft', 'price' => 7499000, 'stock' => 30],
            
            // Wearables
            ['category_id' => 7, 'name' => 'Apple Watch Series 9', 'brand' => 'Apple', 'price' => 6299000, 'stock' => 45],
            ['category_id' => 7, 'name' => 'Samsung Galaxy Watch 6', 'brand' => 'Samsung', 'price' => 4999000, 'stock' => 40],
            
            // Accessories
            ['category_id' => 8, 'name' => 'Anker PowerCore 20000mAh', 'brand' => 'Anker', 'price' => 599000, 'stock' => 100],
            ['category_id' => 8, 'name' => 'Spigen Phone Case', 'brand' => 'Spigen', 'price' => 299000, 'stock' => 150],
        ];

        foreach ($products as $index => $productData) {
            Product::create([
                'category_id' => $productData['category_id'],
                'name' => $productData['name'],
                'slug' => \Illuminate\Support\Str::slug($productData['name']) . '-' . ($index + 1),
                'sku' => 'TG-' . str_pad($index + 1, 5, '0', STR_PAD_LEFT),
                'brand' => $productData['brand'],
                'description' => 'High quality ' . $productData['name'] . ' with latest technology and features. Perfect for both personal and professional use.',
                'price' => $productData['price'],
                'stock' => $productData['stock'],
                'weight' => rand(200, 3000) / 1000, // Random weight 0.2kg - 3kg
                'rating' => rand(35, 50) / 10, // Random rating 3.5 - 5.0
                'review_count' => rand(5, 100),
                'sold_count' => rand(10, 500),
                'views' => rand(50, 2000),
                'images' => ['/images/products/placeholder.jpg'],
                'is_active' => true,
            ]);
        }
    }
}
