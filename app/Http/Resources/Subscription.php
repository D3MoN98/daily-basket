<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Subscription extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        $subscription = parent::toArray($request);
        $subscription['started_at'] = $this->started_at;
        // $subscription['started_at'] = date('jS M, Y', strtotime($this->started_at));
        $subscription['expired_at'] = $this->expired_at;
        // $subscription['expired_at'] = date('jS M, Y', strtotime($this->expired_at));
        $subscription['created_at_human'] = $this->created_at->diffForHumans();
        $subscription['created_at_formatted'] = date('jS M | h:i A', strtotime($this->created_at));
        $subscription['subscription_items'] = $this->subscription_items;
        $subscription['user'] = $this->user;
        $subscription['address'] = $this->address;
        $subscription['restaurant'] = $this->restaurant;
        return $subscription;
    }
}