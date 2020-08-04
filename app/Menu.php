<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'restaurant_id'
    ];

    public function menu_items()
    {
        return $this->hasMany('App\MenuItem');
    }
}
