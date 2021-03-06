<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Restaurant as ResourcesRestaurant;
use App\Restaurant;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyword = $request->get('keyword');
        $orderByColumn = $request->get('order_by_column') ?? 'name';
        $orderBy = $request->get('order_by') ?? 'asc';
        $draw = $request->get('draw') ?? 10;
        $restaurant = Restaurant::orderBy($orderByColumn, $orderBy)->when(strlen($keyword) >= 3, function ($q) use ($keyword) {
            return $q->where('name', 'like', "%$keyword%");
        })->paginate($draw);
        return ResourcesRestaurant::collection($restaurant);
    }

    public function update_verification($id)
    {
        $restaurant = Restaurant::find($id);
        $restaurant->update([
            'is_verified' => $restaurant->is_verified == '1' ? '0' : '1'
        ]);
        return response()->json(['success' => 'restaurant verification changed']);
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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
}