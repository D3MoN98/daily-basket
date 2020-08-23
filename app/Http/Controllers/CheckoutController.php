<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Cartalyst\Stripe\Stripe;
use Exception;
use Spatie\Geocoder\Facades\Geocoder;
use Illuminate\Http\Request;

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
            // 'card_number' => 'required',
            // 'card_exp_month' => 'required',
            // 'card_exp_years' => 'required',
            // 'card_cvv' => 'required',
            'location_lat' => 'required',
            'location_lng' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        // $geocoder->getCoordinatesForAddress('23/4B Banamali Naskar Road');

        return response()->json([
            // 'data' => Geocoder::getAllCoordinatesForAddress('23/4B Banamali Naskar Road'),
            'new' => Geocoder::getAddressForCoordinates((float) 22.5090028, (float) 88.3080772)
        ]);

        try {

            // $stripe = new Stripe();
            // $stripe = Stripe::make(env('STRIPE_SECRET'));

            // $token = $stripe->tokens()->create([
            //     'card' => [
            //         'number' => $request->get('card_number'),
            //         'exp_month' => $request->get('card_exp_month'),
            //         'exp_year' => $request->get('card_exp_years'),
            //         'cvc' => $request->get('card_cvv'),
            //     ],
            // ]);

            // if (!isset($token['id'])) {
            //     return response()->json(['error' => 'error occured']);
            // }

            // $charge = $stripe->charges()->create([
            //     'card' => $token['id'],
            //     'currency' => 'INR',
            //     'amount' => 20,
            //     'description' => 'wallet',
            // ]);

            // return response()->json($charge);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (\Cartalyst\Stripe\Exception\CardErrorException $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (\Cartalyst\Stripe\Exception\MissingParameterException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function order()
    {
        $user = Auth::user();

        Cart::restore($user->id);
        $cart_content = Cart::content();
        return response()->json($cart_content);
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