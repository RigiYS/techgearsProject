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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('shipping_method_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->foreignId('coupon_id')->nullable()->after('shipping_method_id')->constrained()->nullOnDelete();
            $table->string('tracking_number')->nullable()->after('status');
            $table->text('notes')->nullable()->after('tracking_number');
            $table->decimal('discount_amount', 12, 2)->default(0)->after('total_amount');
            $table->decimal('shipping_cost', 12, 2)->default(0)->after('discount_amount');
            
            // Indexes
            $table->index('tracking_number');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['tracking_number']);
            $table->dropIndex(['status']);
            
            $table->dropForeign(['shipping_method_id']);
            $table->dropForeign(['coupon_id']);
            
            $table->dropColumn([
                'shipping_method_id', 'coupon_id', 'tracking_number', 
                'notes', 'discount_amount', 'shipping_cost'
            ]);
        });
    }
};
