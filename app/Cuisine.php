<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Cuisine extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'added_by', 'name', 'description', 'is_active'
    ];
}