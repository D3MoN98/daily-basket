<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'menu_item_id',
        'quantity',
        'subtotal',
        'cooking_status',
    ];


    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}