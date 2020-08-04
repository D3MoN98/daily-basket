<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'user_id', 'name', 'description', 'contact_no', 'image', 'gstin_no', 'fssai_license_no'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function menus()
    {
        return $this->hasMany('App\Menu');
    }
}
