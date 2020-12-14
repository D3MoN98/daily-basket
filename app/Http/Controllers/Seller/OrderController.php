<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order as ResourcesOrder;
use App\Http\Resources\Subscription as ResourcesSubscription;
use App\Http\Resources\User as ResourcesUser;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
use Exception;

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
            $todays_orders = $restaurant->todaysOorders()->where('status', $type)->orderBy('created_at');
        }
        return ResourcesOrder::collection($todays_orders);
    }

    public function currentOrder(Request $request, $type = 'all')
    {
        $keyword = $request->get('keyword');
        $orderByColumn = $request->get('order_by_column') ?? 'created_at';
        $orderBy = $request->get('order_by') ?? 'asc';
        $draw = $request->get('draw') ?? 1;


        $user = Auth::user();
        $restaurant = $user->restaurant;

        $current_orders = $restaurant->orders()->whereDate('created_at', Carbon::today())->with('user')
            ->whereHas('user', function (Builder $query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%");
                $query->orWhere('contact_no', 'like', "%$keyword%");
            })->orderBy($orderByColumn, $orderBy)->paginate($draw);


        return ResourcesOrder::collection($current_orders);
    }

    public function pastOrder(Request $request, $type = 'all')
    {
        $keyword = $request->get('keyword');
        $orderByColumn = $request->get('order_by_column') ?? 'created_at';
        $orderBy = $request->get('order_by') ?? 'asc';
        $draw = $request->get('draw') ?? 1;


        $user = Auth::user();
        $restaurant = $user->restaurant;

        $past_orders = $restaurant->orders()->whereDate('created_at', '>', Carbon::today())->with('user')
            ->whereHas('user', function (Builder $query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%");
                $query->orWhere('contact_no', 'like', "%$keyword%");
            })->orderBy($orderByColumn, $orderBy)->paginate($draw);


        return ResourcesOrder::collection($past_orders);
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

    public function pastSubscription(Request $request, $type = 'all')
    {
        $keyword = $request->get('keyword');
        $orderByColumn = $request->get('order_by_column') ?? 'created_at';
        $orderBy = $request->get('order_by') ?? 'asc';
        $draw = $request->get('draw') ?? 1;


        $user = Auth::user();
        $restaurant = $user->restaurant;

        $current_subscriptionss = $restaurant->subscriptions()->whereDate('created_at', '<', Carbon::today())->with('user')
            ->whereHas('user', function (Builder $query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%");
                $query->orWhere('contact_no', 'like', "%$keyword%");
            })->orderBy($orderByColumn, $orderBy)->paginate($draw);


        return ResourcesSubscription::collection($current_subscriptionss);
    }

    public function currentSubscription(Request $request, $type = 'all')
    {
        $keyword = $request->get('keyword');
        $orderByColumn = $request->get('order_by_column') ?? 'created_at';
        $orderBy = $request->get('order_by') ?? 'asc';
        $draw = $request->get('draw') ?? 1;


        $user = Auth::user();
        $restaurant = $user->restaurant;

        $current_subscriptionss = $restaurant->subscriptions()->whereDate('created_at', Carbon::today())->with('user')
            ->whereHas('user', function (Builder $query) use ($keyword) {
                $query->where('name', 'like', "%$keyword%");
                $query->orWhere('contact_no', 'like', "%$keyword%");
            })->orderBy($orderByColumn, $orderBy)->paginate($draw);


        return ResourcesSubscription::collection($current_subscriptionss);
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

    public function updateStatus(Request $request, $id)
    {
        try {
            Order::find($id)->update(['status' => $request->status]);
            return response()->json(['success' => 'status changed']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}