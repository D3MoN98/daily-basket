<?php

namespace App\Http\Controllers\Seller;

use App\Cuisine;
use App\Http\Controllers\Controller;
use App\Http\Resources\Cuisine as ResourcesCuisine;
use App\Http\Resources\Restaurant as ResourcesRestaurant;
use App\Http\Resources\MenuCategory as ResourcesMenuCategory;
use App\Http\Resources\MenuSubCategory as ResourcesMenuSubCategory;
use App\MenuCategory;
use App\MenuSubCategory;
use App\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = Auth::user();
        return new ResourcesRestaurant($user->restaurant);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $restaurant = $user->restaurant;

        $restaurant->update($request->all());
        return new ResourcesRestaurant($user->restaurant);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function cuisines()
    {
        return ResourcesCuisine::collection(Cuisine::all());
    }

    public function menu_categories()
    {
        return ResourcesMenuCategory::collection(MenuCategory::all());
    }

    public function menu_sub_categories()
    {
        return ResourcesMenuSubCategory::collection(MenuSubCategory::all());
    }
}