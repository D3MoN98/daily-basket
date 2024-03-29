<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes, CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'contact_no', 'last_login_at', 'last_login_ip',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];


    public function roles()
    {
        return $this->belongsToMany('App\Role', 'role_users', 'user_id', 'role_id');
    }

    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first())
            return true;
        return false;
    }


    public function hasAnyRoles($roles)
    {
        if ($this->roles()->whereIn('name', $roles)->first())
            return true;
        return false;
    }

    public function isAdmin()
    {
        if ($this->hasRole('admin'))
            return true;
        return false;
    }


    public function restaurant()
    {
        return $this->hasOne('App\Restaurant');
    }

    public function address()
    {
        return $this->addresses()->first();
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }

    public function menu()
    {
        return $this->hasOne('App\Menu');
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function deliveredOrders()
    {
        return $this->orders()->where('status', 'delivered')->orderBy('created_at', 'asc')->get();
    }

    public function pastOrders()
    {
        return $this->orders()->whereDate('created_at', '<', Carbon::today())->orderBy('created_at', 'desc')->get();
    }

    public function todaysOrders()
    {
        return $this->orders()->whereDate('created_at', Carbon::today())->orderBy('created_at', 'desc')->get();
    }

    public function subscriptions()
    {
        return $this->hasMany('App\Subscription');
    }

    public function pastSubscriptions()
    {
        return $this->subscriptions()->whereDate('expired_at', '<', Carbon::today())->orderBy('created_at', 'desc')->get();
    }

    public function todaysSubscriptions()
    {
        return $this->subscriptions()->whereDate('started_at', '<=', Carbon::today())->whereDate('expired_at', '>=', Carbon::today())->orderBy('created_at', 'desc')->get();
    }

    public function kitchen_staffs()
    {
        return $this->belongsToMany('App\User', 'kitchen_staff', 'added_by', 'user_id')->withPivot('id', 'restaurant_id', 'is_active');
    }

    public function kitchen_staff()
    {
        return $this->hasOne('App\KitchenStaff');
    }

    public function delivery_boy()
    {
        return $this->hasOne('App\DeliveryBoy');
    }

    public function feedbacks()
    {
        return $this->hasMany('App\Feedback');
    }
}