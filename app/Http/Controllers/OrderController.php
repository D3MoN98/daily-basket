<?php

namespace App\Http\Controllers;

use App\Http\Resources\Order as ResourcesOrder;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function currentOrders()
    {
        $user = Auth::user();
        return ResourcesOrder::collection($user->todaysOrders());
    }

    public function pastOrders()
    {
        $user = Auth::user();
        return ResourcesOrder::collection($user->pastOrders());
    }
}