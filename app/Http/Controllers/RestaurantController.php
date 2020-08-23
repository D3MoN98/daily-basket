<?php

namespace App\Http\Controllers;

use App\Http\Resources\Restaurant as ResourcesRestaurant;
use App\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function trending()
    {
        return ResourcesRestaurant::collection(Restaurant::whereNotIn('id', [3, 4])->get());
    }

    public function new()
    {
        return ResourcesRestaurant::collection(Restaurant::all());
    }

    public function premium()
    {
        return ResourcesRestaurant::collection(Restaurant::all());
    }

    public function show($slug)
    {
        return new ResourcesRestaurant(Restaurant::findBySlug($slug));
    }
}