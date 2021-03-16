<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SellerController extends Controller
{
    public function countOverview()
    {
        $user = User::find(Auth::id());
        $count['total_order'] = $user->restaurant->orders->count();
        $count['in_progress_order'] = $user->restaurant->progressOrders('today')->count();
        $count['delivered_order'] = $user->restaurant->deliveredOrders('today')->count();
        $count['cancelled_order'] = $user->restaurant->cancelledOrders('today')->count();
        $count['total_member'] = $user->restaurant->kitchen_staffs->count() +  $user->restaurant->delivery_boys->count();
        $count['most_ordered_items'] = $user->restaurant->most_order_items();


        return response()->json(['data' => $count]);
    }
}