<?php

namespace App\Http\Controllers;

use App\MenuItem;
use App\Http\Resources\MenuItem as ResourcesMenuItem;
use Illuminate\Http\Request;
use Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $restaurant_id = $this->getRestaurntID();
        Cart::restore($user->id);
        return response()->json(['data' => $this->toArray(Cart::content()), 'restaurant_id' => $restaurant_id]);
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
        $user = Auth::user();
        $menu_item = MenuItem::find($request->id);
        $restaurant_id = $menu_item->menu->restaurant->id;

        Cart::restore($user->id);

        if (Cart::content()->count() > 0) {
            $menu_id = Cart::content()->first()->id;
            $existing_menu_item = MenuItem::find($menu_id);
            if ($menu_item->menu->restaurant->id !== $existing_menu_item->menu->restaurant->id && !$request->refresh) {
                return response()->json(['error' => 'Item is not in the same restaurant']);
            }

            if ($request->refresh) {
                Cart::destroy();
            }
        }


        Cart::add($menu_item, $request->qty ?? 1);
        Cart::store($user->id);

        return response()->json(['data' => $this->toArray(Cart::content()), 'restaurant_id' => $restaurant_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();

        Cart::restore($user->id);
        Cart::get($id);
        Cart::store($user->id);

        return response()->json(['data' => Cart::content()]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = Auth::user();

        Cart::restore($user->id);
        Cart::get($id);
        Cart::store($user->id);

        return response()->json(['data' => Cart::content()]);
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
        $user = Auth::user();

        Cart::restore($user->id);
        Cart::update($id, $request->qty);
        Cart::store($user->id);

        return response()->json(['data' => Cart::content()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();

        Cart::restore($user->id);
        Cart::remove($id);
        Cart::store($user->id);

        return response()->json(['data' => $this->toArray(Cart::content())]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy_all($id)
    {
        $user = Auth::user();

        Cart::restore($user->id);
        foreach ($content as $key) {
            Cart::remove($id);
        }
        Cart::destroy();

        return response()->json(['success' => 'cart is empty']);
    }

    public function toArray($content)
    {
        $array = [];
        foreach ($content as $key) {
            $push_array = $key;
            $push_array->subtotal = $key->subtotal;
            $push_array->model = $key->model;
            array_push($array, $push_array);
        }

        return $array;
    }

    public function getRestaurntID()
    {
        $user = Auth::user();
        Cart::restore($user->id);
        $menu_id = Cart::content()->first()->id;
        $menu_item = MenuItem::find($menu_id);
        return $menu_item->menu->restaurant->id;
    }
}