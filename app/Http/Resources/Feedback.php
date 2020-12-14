<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Feedback extends JsonResource
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
        $feedback = parent::toArray($request);
        $feedback['created_at_formatted'] = date('jS M | h:i A', strtotime($this->created_at));
        $feedback['created_at_timestamp'] = strtotime($this->created_at);
        $feedback['created_at_human'] = $this->created_at->diffForHumans();
        $feedback['user'] = $this->user;


        return $feedback;
    }
}