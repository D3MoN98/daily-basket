<?php

namespace App\Http\Controllers;

use App\MenuItem;
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
        Cart::restore($user->id);

        return response()->json(['data' => Cart::content()]);
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

        Cart::restore($user->id);
        Cart::add($menu_item, $request->qty ?? 1);
        Cart::store($user->id);

        return response()->json(['data' => Cart::content()]);

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

        return response()->json(['data' => Cart::content()]);
    }
}
