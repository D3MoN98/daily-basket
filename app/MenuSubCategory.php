<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuSubCategory extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'added_by', 'menu_category_id ', 'name', 'description', 'is_active'
    ];
}