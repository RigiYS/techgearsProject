<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'product_id',
        'quantity',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Accessors
    public function getSubtotalAttribute()
    {
        return $this->product->price * $this->quantity;
    }

    // Methods
    public static function getOrCreateSessionId()
    {
        if (!session()->has('cart_session_id')) {
            session(['cart_session_id' => uniqid('cart_', true)]);
        }

        return session('cart_session_id');
    }
}
