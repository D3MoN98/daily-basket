<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
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
        'type',
        'started_at',
        'expired_at',
    ];


    public function payment()
    {
        return $this->morphOne('App\Payment', 'paymentable');
    }

    public function restaurant()
    {
        return $this->belongsTo('App\Restaurant');
    }

    public function address()
    {
        return $this->belongsTo('App\Address');
    }


    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function subscription_items()
    {
        return $this->belongsToMany('App\MenuItem', 'subscription_items')->withPivot('quantity', 'subtotal');
    }
}