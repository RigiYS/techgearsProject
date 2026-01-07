<?php

namespace Database\Seeders;

use App\Models\ShippingMethod;
use Illuminate\Database\Seeder;

class ShippingMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            [
                'name' => 'Regular Shipping',
                'code' => 'REGULAR',
                'base_cost' => 50000,
                'estimated_days' => '5-7',
                'description' => 'Standard delivery within 5-7 business days',
                'is_active' => true,
            ],
            [
                'name' => 'Express Shipping',
                'code' => 'EXPRESS',
                'base_cost' => 100000,
                'estimated_days' => '2-3',
                'description' => 'Fast delivery within 2-3 business days',
                'is_active' => true,
            ],
            [
                'name' => 'Same Day Delivery',
                'code' => 'SAME_DAY',
                'base_cost' => 150000,
                'estimated_days' => '1',
                'description' => 'Same day delivery for selected areas',
                'is_active' => true,
            ],
        ];

        foreach ($methods as $method) {
            ShippingMethod::create($method);
        }
    }
}
