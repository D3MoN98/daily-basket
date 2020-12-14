<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Http\Resources\Feedback as ResourcesFeedback;
use App\Http\Resources\Order as ResourcesOrder;
use App\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $feedbacks = Auth::user()->feedbacks;

            return ResourcesFeedback::collection($feedbacks);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * check feedback need
     *
     * @return \Illuminate\Http\Response
     */
    public function check()
    {
        try {
            $user = Auth::user();
            $orders = $user->todaysOrders();
            $no_feedback_orders = [];
            foreach ($orders as $key) {
                if ($key->feedback == null) {
                    array_push($no_feedback_orders, $key->id);
                }
            }

            return response()->json(['order_ids' => $no_feedback_orders]);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'order_id' => 'required',
                'rating' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $feedback = Feedback::create([
                'user_id' => Auth::user()->id,
                'order_id' => $request->order_id,
                'rating' => $request->rating,
                'review' => $request->review
            ]);

            return new ResourcesFeedback($feedback);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {

            $feedback = Feedback::find($id);

            return new ResourcesFeedback($feedback);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
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
        try {

            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
                'order_id' => 'required',
                'rating' => 'required',
                'review' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $feedback = Feedback::find($id)->update([
                'user_id' => Auth::user()->id,
                'order_id' => $request->order_id,
                'rating' => $request->rating,
                'review' => $request->review
            ]);

            return new ResourcesFeedback($feedback);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
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