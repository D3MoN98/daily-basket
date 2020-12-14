<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubscriptionDelivery extends Model
{
    protected $fillable = ['subscription_id', 'delivery_assigned_to', 'status', 'is_delivered', 'delivered_at'];
}
