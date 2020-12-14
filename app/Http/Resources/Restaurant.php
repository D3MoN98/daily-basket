<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class Restaurant extends JsonResource
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
        $restaurnt = parent::toArray($request);
        $restaurnt['user'] = $this->when(Auth::check() && Auth::user()->isAdmin(), $this->user);
        $restaurnt['image'] = '/storage/' . $this->image;
        $restaurnt['rating'] = $this->avgRating();
        $restaurnt['opening_time'] = date('h:i A', strtotime($this->opening_time));
        $restaurnt['closing_time'] = date('h:i A', strtotime($this->closing_time));
        $restaurnt['subscription'] = $this->subscription;
        $restaurnt['address'] = $this->user->addresses()->first();
        $restaurnt['menu'] = $this->menus()->first();
        $restaurnt['menu'] = $this->cuisines();


        return $restaurnt;
    }
}