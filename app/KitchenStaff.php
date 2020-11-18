<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KitchenStaff extends Model
{
    protected $fillable = [
        'user_id', 'restaurant_id', 'added_by', 'is_active'
    ];
}