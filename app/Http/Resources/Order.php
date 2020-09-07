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
        $order['user'] = $this->user;
        $order['address'] = $this->address;
        $order['delevery_boy'] = $this->delevery_boy;
        return $order;
    }
}