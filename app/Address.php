<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'user_id', 'house_no', 'address', 'landmark', 'type', 'latitude', 'longitude'
    ];
}
