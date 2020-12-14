<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['user_id', 'order_id', 'rating', 'review'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}