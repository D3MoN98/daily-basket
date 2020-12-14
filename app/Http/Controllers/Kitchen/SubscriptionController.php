<?php

namespace App\Http\Controllers\Kitchen;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order as ResourcesOrder;
use App\Http\Resources\Subscription as ResourcesSubscription;
use App\KitchenStaff;
use App\Order;
use App\OrderItem;
use App\Restaurant;
use App\Subscription;
use App\SubscriptionDelivery;
use App\SubscriptionItem;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
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

            $subscriptions = $restaurant->subscriptions()->whereDate('started_at', '<=', Carbon::today())->whereDate('expired_at', '>=', Carbon::today())->orderBy('created_at', 'desc')->get();

            return ResourcesSubscription::collection($subscriptions);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * update status of subscription
     *
     * @param Request $request
     * @param int $id
     * @return json
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $subscription_item = SubscriptionItem::findOrFail($id)->update([
                'cooking_status' => $request->status
            ]);

            $this->checkAndUpdateSubscriptionDeliveryStatus(SubscriptionItem::find($id)->subscription_id);

            return response()->json(['success' => 'status updated']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * check and update subscription deliveries status
     *
     * @param int $id
     * @return bool
     */
    public function checkAndUpdateSubscriptionDeliveryStatus($id)
    {
        $subscription = Subscription::find($id);
        $subscription_items = $subscription->subscription_items;

        $i = 0;
        foreach ($subscription_items as $key) {
            if ($key->pivot->cooking_status == 'completed') {
                $i++;
            }
        }

        $subscription_deliveries = $subscription->subscription_deliveries()->whereDate('created_at', Carbon::today())->first();

        if ($subscription_deliveries->count() === 0) {
            SubscriptionDelivery::create([
                'subscription_id' => $id,
            ]);
        }

        $subscription_deliveries = $subscription_deliveries->fresh();

        if ($subscription_items->count() === $i) {
            $subscription_deliveries->update([
                'status' => 'prepared',
            ]);

            return true;
        } else {

            return true;
        }
    }
}