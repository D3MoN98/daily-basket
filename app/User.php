<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'contact_no'
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
}