<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Order extends JsonResource
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
        $order = parent::toArray($request);
        $order['created_at_formatted'] = date('jS M | h:i A', strtotime($this->created_at));
        $order['created_at_timestamp'] = strtotime($this->created_at);
        $order['created_at_human'] = $this->created_at->diffForHumans();
        $order['user'] = $this->user;
        $order['restaurant'] = $this->restaurant;
        $order['address'] = $this->address;
        $order['delevery_boy'] = $this->delevery_boy;
        $order['order_items'] = $this->order_items;
        return $order;
    }
}