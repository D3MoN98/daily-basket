<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
        return
            [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'name' => $this->name,
                'slug' => $this->slug,
                'description' => $this->description,
                'contact_no' => $this->contact_no,
                'image' => $this->image,
                'gstin_no' => $this->gstin_no,
                'fssai_license_no' => $this->fssai_license_no,
                'address' => $this->user->addresses()->first(),
                'menu' => $this->menus()->first(),
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ];
    }
}