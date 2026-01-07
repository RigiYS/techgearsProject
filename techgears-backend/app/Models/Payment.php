<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'transaction_id',
        'payment_method',
        'amount',
        'status',
        'midtrans_response',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'midtrans_response' => 'array',
        'paid_at' => 'datetime',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Methods
    public function markAsPaid()
    {
        $this->update([
            'status' => 'success',
            'paid_at' => now(),
        ]);

        // Update order status
        $this->order->updateStatus('processing');
    }

    public function markAsFailed()
    {
        $this->update(['status' => 'failed']);
    }

    public function markAsExpired()
    {
        $this->update(['status' => 'expired']);
        
        // Cancel the order
        $this->order->cancel();
    }
}
