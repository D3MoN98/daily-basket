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

    /**
     * Get all of the order_items for the Restaurant
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function most_order_items()
    {
        $order_items = [];
        foreach ($this->orders as $key) {
            foreach ($key->order_items as $key2) {
                array_push($order_items, $key2);
            }
        }

        $most_order_items = [];
        $offset = 0;
        foreach ((array_count_values(array_column($order_items, 'id'))) as $key => $value) {
            if ($offset < 5) {
                array_push($most_order_items, ['count' => $value, "data" => MenuItem::find($key)]);
            }
            $offset++;
        }
        return $most_order_items;
    }

    public function todaysOorders()
    {
        return $this->orders()->whereDate('created_at', Carbon::today())->get();
    }

    public function progressOrders($date = null)
    {
        if ($date === 'today') {
            return $this->orders()->whereNotIn('status', ['delivered', 'accepted'])->whereDate('created_at', Carbon::today())->get();
        } elseif ($date !== null) {
            return $this->orders()->whereNotIn('status', ['delivered', 'accepted'])->whereDate('created_at', Carbon::parse($date))->get();
        }

        return $this->orders()->where('status', 'delivered')->whereNotIn('status', ['delivered', 'accepted'])->get();
    }

    public function deliveredOrders($date = null)
    {
        if ($date === 'today') {
            return $this->orders()->where('status', 'delivered')->whereDate('created_at', Carbon::today())->get();
        } elseif ($date !== null) {
            return $this->orders()->where('status', 'delivered')->whereDate('created_at', Carbon::parse($date))->get();
        }
        return $this->orders()->where('status', 'delivered')->get();
    }


    public function cancelledOrders($date = null)
    {
        if ($date === 'today') {
            return $this->orders()->where('status', 'cancelled')->whereDate('created_at', Carbon::today())->get();
        } elseif ($date !== null) {
            return $this->orders()->where('status', 'cancelled')->whereDate('created_at', Carbon::parse($date))->get();
        }
        return $this->orders()->where('status', 'cancelled')->get();
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

    /**
     * Get all of the kitchen_staffs for the Restaurant
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function kitchen_staffs()
    {
        return $this->hasMany('App\KitchenStaff');
    }


    /**
     * Get all of the delivery_boys for the Restaurant
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function delivery_boys()
    {
        return $this->user->belongsToMany('App\User', 'delivery_boys', 'added_by', 'user_id');
    }
}