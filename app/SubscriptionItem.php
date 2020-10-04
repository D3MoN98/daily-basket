<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubscriptionItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subscription_id',
        'menu_item_id',
        'quantity',
        'subtotal',
        'cooking_status',
    ];
}