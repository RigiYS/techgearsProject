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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type', ['fixed', 'percentage'])->default('percentage');
            $table->decimal('value', 12, 2)->comment('Amount for fixed, percentage for percentage');
            $table->decimal('min_purchase', 12, 2)->default(0)->comment('Minimum purchase amount');
            $table->decimal('max_discount', 12, 2)->nullable()->comment('Max discount for percentage type');
            $table->timestamp('valid_from')->nullable();
            $table->timestamp('valid_until')->nullable();
            $table->integer('usage_limit')->nullable()->comment('Max number of uses');
            $table->integer('usage_count')->default(0)->comment('Current usage count');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes
            $table->index('code');
            $table->index(['valid_from', 'valid_until']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
