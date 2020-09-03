<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuItem as ResourcesMenuItem;
use App\Menu;
use App\MenuItem;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ResourcesMenuItem::collection(Auth::user()->menu->menu_items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
                'type' => 'required',
                'price' => 'required',
                'gst' => 'required',
                'delivery_charge' => 'required',
                'quantity_serves_per_day' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);


            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = Auth::user();
            $menu = Menu::firstOrCreate(['restaurant_id' => $user->restaurant->id], [
                'user_id' => $user->id,
                'restaurant_id' => $user->restaurant->id,
            ]);


            $path = $request->file('image')->store('menu_item', 'public');

            $menu_item = MenuItem::create([
                'menu_id' => $menu->id,
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'menu_category_id' => $request->menu_category_id ?? null,
                'menu_sub_category_id' => $request->menu_sub_category_id ?? null,
                'cuisine_id' => $request->cuisine_id ?? null,
                'quantity_serves_per_day' => $request->quantity_serves_per_day,
                'image' => $path,
                'price' => $request->price,
                'gst' => $request->gst,
                'delivery_charge' => $request->delivery_charge,
            ]);

            return new ResourcesMenuItem($menu_item->fresh());
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new ResourcesMenuItem(MenuItem::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'description' => 'required',
                'type' => 'required',
                'price' => 'required',
                'gst' => 'required',
                'delivery_charge' => 'required',
                // 'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $menu_item = MenuItem::find($id);

            // $path = $request->file('image')->store('storage/menu_item','public');

            $menu_item->update([
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'menu_category_id' => $request->menu_category_id,
                'menu_sub_category_id' => $request->menu_sub_category_id,
                'cuisine_id' => $request->cuisine_id,
                'quantity_serves_per_day' => $request->quantity_serves_per_day,
                'price' => $request->price,
                'gst' => $request->gst,
                'delivery_charge' => $request->delivery_charge,
            ]);

            return new ResourcesMenuItem($menu_item->fresh());
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
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
        try {
            MenuItem::find($id)->delete();
            return response()->json(['sucsess' => 'menu item deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
        }
    }

    public function change_item_available($id)
    {
        try {
            $menu_item = MenuItem::find($id);

            $menu_item->update([
                'is_available' => $menu_item->is_available == '0' ? '1' : '0'
            ]);

            return response()->json(['sucsess' => $menu_item->fresh()->is_available]);
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
        }
    }
}