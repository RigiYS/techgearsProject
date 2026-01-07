<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->unique()->after('id');
            $table->string('brand')->nullable()->after('name');
            $table->decimal('weight', 8, 2)->default(0)->after('price')->comment('Weight in kg');
            $table->decimal('rating', 3, 2)->default(0)->after('stock')->comment('Average rating');
            $table->integer('review_count')->default(0)->after('rating');
            $table->integer('sold_count')->default(0)->after('review_count');
            $table->integer('views')->default(0)->after('sold_count');
            $table->json('images')->nullable()->after('views')->comment('Array of image URLs');
            
            // Indexes
            $table->index('rating');
            $table->index('sold_count');
            $table->index('brand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['rating']);
            $table->dropIndex(['sold_count']);
            $table->dropIndex(['brand']);
            
            $table->dropColumn([
                'sku', 'brand', 'weight', 'rating', 'review_count', 
                'sold_count', 'views', 'images'
            ]);
        });
    }
};
