<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'address_id',
        'subtotal',
        'delivery_charge',
        'tax',
        'discount',
        'total',
        'status',
        'delivery_assigned_to',
    ];

    /**
     * Get the post's image.
     */
    public function payment()
    {
        return $this->morphOne('App\Payment', 'paymentable');
    }
}