<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shipping_method_id',
        'coupon_id',
        'order_number',
        'total_amount',
        'discount_amount',
        'shipping_cost',
        'status',
        'shipping_address',
        'billing_address',
        'payment_method',
        'tracking_number',
        'notes',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'shipping_address' => 'array',
        'billing_address' => 'array',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function shippingMethod()
    {
        return $this->belongsTo(ShippingMethod::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeRecent($query)
    {
        return $query->latest();
    }

    // Accessors
    public function getSubtotalAttribute()
    {
        return $this->items->sum(function ($item) {
            return $item->subtotal;
        });
    }

    public function getFinalTotalAttribute()
    {
        return $this->subtotal - $this->discount_amount + $this->shipping_cost;
    }

    // Methods
    public static function generateOrderNumber()
    {
        $prefix = 'TG';
        $date = date('Ymd');
        $random = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));
        
        return "{$prefix}{$date}{$random}";
    }

    public function calculateTotal()
    {
        $subtotal = $this->items->sum('subtotal');
        $discount = $this->discount_amount ?? 0;
        $shipping = $this->shipping_cost ?? 0;

        $this->update([
            'total_amount' => $subtotal - $discount + $shipping,
        ]);
    }

    public function updateStatus($status)
    {
        $this->update(['status' => $status]);
        
        // You can add event/notification logic here
        // event(new OrderStatusUpdated($this));
    }

    public function cancel()
    {
        if (in_array($this->status, ['pending', 'processing'])) {
            // Restore stock
            foreach ($this->items as $item) {
                $item->product->increment('stock', $item->quantity);
                $item->product->decrement('sold_count', $item->quantity);
            }

            $this->updateStatus('cancelled');
            return true;
        }

        return false;
    }
}
