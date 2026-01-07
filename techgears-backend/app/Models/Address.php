<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'street',
        'city',
        'province',
        'postal_code',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Boot
    protected static function boot()
    {
        parent::boot();

        // When setting an address as default, unset other defaults
        static::saving(function ($address) {
            if ($address->is_default) {
                static::where('user_id', $address->user_id)
                    ->where('id', '!=', $address->id)
                    ->update(['is_default' => false]);
            }
        });

        // If this is the first address, make it default
        static::creating(function ($address) {
            if (!static::where('user_id', $address->user_id)->exists()) {
                $address->is_default = true;
            }
        });
    }

    // Accessors
    public function getFullAddressAttribute()
    {
        return "{$this->street}, {$this->city}, {$this->province} {$this->postal_code}";
    }
}
