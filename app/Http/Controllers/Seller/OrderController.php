<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order as ResourcesOrder;
use App\Http\Resources\User as ResourcesUser;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function todaysOrder($type = 'all')
    {
        $user = Auth::user();
        $restaurant = $user->restaurant;
        $todays_orders = $restaurant->todaysOorders();
        if ($type !== 'all') {
            $todays_orders = $restaurant->todaysOorders()->where('status', $type);
        }
        return ResourcesOrder::collection($todays_orders);
    }

    public function assignOrder(Request $request, $id)
    {
        try {
            $order = Order::find($id)->update([
                'delivery_assigned_to' => $request->user_id
            ]);
            return response()->json(['success' => 'assigned successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function orderDelivered($id)
    {
        try {
            $order = Order::find($id)->update([
                'status' => 'delivered'
            ]);
            return response()->json(['success' => 'order delivered']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getDeleveryBoys()
    {
        $user = User::whereHas('roles', function ($q) {
            $q->where('roles.id', 4);
        })->get();

        return ResourcesUser::collection($user);
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
}