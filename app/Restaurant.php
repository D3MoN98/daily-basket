<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;


class Restaurant extends Model
{
    use Sluggable, SluggableScopeHelpers;

    protected $fillable = [
        'user_id', 'name', 'slug', 'description', 'contact_no', 'image', 'gstin_no', 'fssai_license_no', 'opening_time', 'closing_time', 'subscription', 'cuisines', 'is_verified'
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

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function todaysOorders()
    {
        return $this->orders()->whereDate('created_at', Carbon::today())->get();
    }

    public function subscriptions()
    {
        return $this->hasMany('App\Subscription');
    }

    public function address()
    {
        return $this->user()->addresses()->first();
    }

    public function feedbacks()
    {
        return $this->hasManyThrough('App\Feedback', 'App\Order');
    }

    public function avgRating()
    {
        $feedbacks = $this->feedbacks;

        if ($feedbacks->count() === 0) {
            return 0;
        }

        $rating = 0;
        foreach ($feedbacks as $key) {
            $rating += $key->rating;
        }
        return ceil($rating / $feedbacks->count());
    }

    public function customers()
    {
        return $this->belongsToMany('App\User', 'orders', 'restaurant_id', 'user_id')->groupBy('id');
    }
}