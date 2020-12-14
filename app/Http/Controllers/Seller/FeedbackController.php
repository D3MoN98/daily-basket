<?php

namespace App\Http\Controllers\Seller;

use App\Feedback;
use App\Http\Controllers\Controller;
use App\Http\Resources\Feedback as ResourcesFeedback;
use App\Http\Resources\Order as ResourcesOrder;
use App\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $keyword = $request->get('keyword');
            $orderByColumn = $request->get('order_by_column') ?? 'created_at';
            $orderBy = $request->get('order_by') ?? 'asc';
            $draw = $request->get('draw') ?? 1;

            $feedbacks = Auth::user()->restaurant->feedbacks()->orderBy($orderByColumn, $orderBy)->paginate($draw);
            return ResourcesFeedback::collection($feedbacks);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }
}