<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['user_id', 'order_id', 'rating', 'review', 'improve_in'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}