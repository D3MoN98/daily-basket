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
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as Image;


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
        try {
            if ($request->opening_time) {
                $request->opening_time = date('H:i', strtotime($request->opening_time));
            }

            if ($request->closing_time) {
                $request->closing_time = date('H:i', strtotime($request->closing_time));
            }

            $user = Auth::user();
            $restaurant = $user->restaurant;
            $restaurant->update($request->all());

            return new ResourcesRestaurant($user->restaurant);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update restaurant image
     *
     * @param Request $request
     * @return void
     */
    public function update_image(Request $request)
    {
        try {
            $user = Auth::user();
            $restaurant = $user->restaurant;

            $base64_image = $request->image;
            if (preg_match('/^data:image\/(\w+);base64,/', $base64_image)) {
                $data = substr($base64_image, strpos($base64_image, ',') + 1);
                $data = base64_decode($data);
                $image = Image::make($data)->stream('png', 75);
                $path = 'restaurant/' . md5(time()) . '.png';
                $result = Storage::disk('public')->put($path, $image);

                if ($result) {
                    Storage::disk('public')->delete($restaurant->image);

                    $restaurant->update([
                        'image' => $path
                    ]);

                    return response()->json(['success' => 'image uploaded successfully']);
                }
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
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