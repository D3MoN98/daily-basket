<?php

namespace App\Http\Controllers;

use App\Http\Resources\Restaurant as ResourcesRestaurant;
use App\MenuItem;
use App\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function trending()
    {
        return ResourcesRestaurant::collection(Restaurant::where('is_verified', '1')->get());
    }

    public function new()
    {
        return ResourcesRestaurant::collection(Restaurant::where('is_verified', '1')->get());
    }

    public function premium()
    {
        return ResourcesRestaurant::collection(Restaurant::where('is_verified', '1')->get());
    }

    public function show($slug)
    {
        return new ResourcesRestaurant(Restaurant::findBySlug($slug));
    }

    public function search(Request $request)
    {
        $restaurant_result = Restaurant::where('name', 'like', "%{$request->keyword}%")->get();
        $menu_item_result = MenuItem::where('name', 'like', "%{$request->keyword}%")->get();

        $results = [];

        foreach ($restaurant_result as $key) {
            $array['id'] = $key->id;
            $array['slug'] = $key->slug;
            $array['name'] = $key->name;
            $array['url'] = "https://picsum.photos/200";
            $array['category'] = "Restaurant";
            array_push($results, $array);
        }

        foreach ($menu_item_result as $key) {
            $array['id'] = $key->id;
            $array['slug'] = $key->menu->restaurant->slug;
            $array['name'] = $key->name;
            $array['url'] = "https://picsum.photos/200";
            $array['category'] = "Dish";
            array_push($results, $array);
        }

        return response()->json(['results' => $results]);
    }
}