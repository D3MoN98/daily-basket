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
        'restaurant_id',
        'address_id',
        'subtotal',
        'delivery_charge',
        'tax',
        'discount',
        'total',
        'status',
        'delivery_assigned_to',
    ];


    public function payment()
    {
        return $this->morphOne('App\Payment', 'paymentable');
    }


    public function address()
    {
        return $this->belongsTo('App\Address');
    }


    public function user()
    {
        return $this->belongsTo('App\User');
    }


    public function delevery_boy()
    {
        return $this->belongsTo('App\User', 'delivery_assigned_to');
    }
}