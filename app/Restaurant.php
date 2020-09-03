<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;


class Restaurant extends Model
{
    use Sluggable, SluggableScopeHelpers;

    protected $fillable = [
        'user_id', 'name', 'slug', 'description', 'contact_no', 'image', 'gstin_no', 'fssai_license_no', 'opening_time', 'closing_time', 'subscription', 'cuisines'
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function menus()
    {
        return $this->hasMany('App\Menu');
    }

    public function cuisines()
    {
        if (is_null($this->cuisines)) {
            return null;
        }

        return Cuisine::whereIn('id', explode(',', $this->cuisines))->get();
    }
}