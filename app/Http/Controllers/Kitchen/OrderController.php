<?php

namespace App\Http\Controllers\Kitchen;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order as ResourcesOrder;
use App\KitchenStaff;
use App\Order;
use App\OrderItem;
use App\Restaurant;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $restaurant = $user->kitchen_staff->restaurant;

            $statuses = ['"in_progress"', '"processing"', '"accepted"', '"prepared"', '"delivered"'];

            $orders = $restaurant->orders()->whereDate('created_at', Carbon::today())->orderByRaw('FIELD (status, ' . implode(', ', $statuses) . ') ASC')->orderBy('created_at')->get();

            return ResourcesOrder::collection($orders);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            OrderItem::findOrFail($id)->update([
                'cooking_status' => $request->status
            ]);

            $this->checkCompleteStatus(OrderItem::find($id)->order_id);

            return response()->json(['success' => 'status updated']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function checkCompleteStatus($id)
    {
        $order = Order::find($id);
        $order_items = $order->order_items;

        $i = 0;
        foreach ($order_items as $key) {
            if ($key->pivot->cooking_status == 'completed') {
                $i++;
            }
        }

        if ($order_items->count() === $i) {
            $order->update([
                'status' => 'prepared'
            ]);
            return true;
        } else {
            $order->update([
                'status' => 'in_progress'
            ]);
            return true;
        }
    }
}