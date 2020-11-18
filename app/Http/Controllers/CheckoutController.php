<?php

namespace App\Http\Controllers;

use Cart;
use App\Order;
use App\Subscription;
use App\OrderItem;
use App\SubscriptionItem;
use App\MenuItem;
use Illuminate\Support\Facades\Validator;
use Cartalyst\Stripe\Stripe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $validator = Validator::make($request->all(), [
            'card_number' => 'required',
            'card_exp_month' => 'required',
            'card_exp_years' => 'required',
            'card_cvv' => 'required',
            'address_id' => 'required',
            'subtotal' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {

            $stripe = new Stripe();
            $stripe = Stripe::make(env('STRIPE_API_KEY'));

            $token = $stripe->tokens()->create([
                'card' => [
                    'number' => $request->get('card_number'),
                    'exp_month' => $request->get('card_exp_month'),
                    'exp_year' => $request->get('card_exp_years'),
                    'cvc' => $request->get('card_cvv'),
                ],
            ]);

            if (!isset($token['id'])) {
                return response()->json(['error' => 'error occured']);
            }

            $charge = $stripe->charges()->create([
                'card' => $token['id'],
                'currency' => 'INR',
                'amount' => (float) ($request->subtotal + $request->tax ?? 0 + $request->delivery_charge ?? 0),
                'description' => 'new order',
            ]);


            if ($charge['status'] === 'succeeded') {
                $subscription = $request->get('subscription');
                if ($subscription['applied'] === true) {
                    return $this->subscribe($request->all(), $charge);
                } else if ($subscription['applied'] === false) {
                    return $this->order($request->all(), $charge);
                }
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (\Cartalyst\Stripe\Exception\CardErrorException $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (\Cartalyst\Stripe\Exception\MissingParameterException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function order($request, $charge)
    {
        try {

            $user = Auth::user();

            $order = Order::create([
                'user_id' => $user->id,
                'restaurant_id' => $this->getRestaurntID(),
                'address_id' => $request['address_id'],
                'subtotal' => $request['subtotal'],
                'total' => (float) ($request['subtotal'] + ($request['tax'] ?? 0) + ($request['delivery_charge'] ?? 0)),
                'tax' => $request['tax'] ?? 0,
                'delivery_charge' => $request['delivery_charge'] ?? 0,
                'discount' => $request['discount'] ?? null,
            ]);

            $order->payment()->create([
                'charge_id' => $charge['id'],
                'amount' => (float) ($charge['amount']) / 100,
                'status' => $charge['status']
            ]);

            Cart::restore($user->id);
            $cart_items = Cart::content();

            foreach ($cart_items as $key) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $key->id,
                    'quantity' => $key->qty,
                    'subtotal' => $key->subtotal,
                ]);
            }

            Cart::destroy();
            Cart::store($user->id);


            return response()->json(['success' => 'Your order has been placed']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }


    public function subscribe($request, $charge)
    {
        try {

            $user = Auth::user();

            $order = Subscription::create([
                'user_id' => $user->id,
                'restaurant_id' => $this->getRestaurntID(),
                'address_id' => $request['address_id'],
                'subtotal' => $request['subtotal'],
                'total' => (float) ($request['subtotal'] + ($request['tax'] ?? 0) + ($request['delivery_charge'] ?? 0)),
                'tax' => $request['tax'] ?? 0,
                'delivery_charge' => $request['delivery_charge'] ?? 0,
                'discount' => $request['discount'] ?? null,
                'started_at' => date('Y-m-d', floor($request['subscription']['start'] / 1000)),
                'expired_at' => date('Y-m-d', floor($request['subscription']['end'] / 1000)),
            ]);

            $order->payment()->create([
                'charge_id' => $charge['id'],
                'amount' => (float) ($charge['amount']) / 100,
                'status' => $charge['status']
            ]);

            Cart::restore($user->id);
            $cart_items = Cart::content();

            foreach ($cart_items as $key) {
                SubscriptionItem::create([
                    'subscription_id' => $order->id,
                    'menu_item_id' => $key->id,
                    'quantity' => $key->qty,
                    'subtotal' => $key->subtotal,
                ]);
            }

            Cart::destroy();
            Cart::store($user->id);


            return response()->json(['success' => 'Your order has been placed']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }


    public function getRestaurntID()
    {
        $user = Auth::user();
        Cart::restore($user->id);
        $menu_id = Cart::content()->first()->id;
        $menu_item = MenuItem::find($menu_id);
        return $menu_item->menu->restaurant->id;
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