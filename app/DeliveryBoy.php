<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryBoy extends Model
{
    protected $fillable = [
        'user_id', 'added_by', 'is_active'
    ];

    public function restaurant()
    {
        return $this->belongsTo('App\Restaurant');
    }
}