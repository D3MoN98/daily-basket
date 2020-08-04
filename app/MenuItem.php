<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Gloudemans\Shoppingcart\Contracts\Buyable;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItem extends Model implements Buyable
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'menu_id',
        'name',
        'description',
        'type',
        'menu_category_id',
        'menu_sub_category_id',
        'cuisine_id',
        'quantity_serves_per_day',
        'image',
        'price',
        'gst',
        'delivery_charge',
        'sort_order',
        'is_available',
        'status'
    ];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function getBuyableIdentifier($options = null) {
        return $this->id;
    }

    public function getBuyableDescription($options = null) {
        return $this->name;
    }

    public function getBuyablePrice($options = null) {
        return $this->price;
    }

}
