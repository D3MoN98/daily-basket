<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Subscription as ResourcesSubscription;
use App\Subscription;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function currentSubscriptions()
    {
        $user = Auth::user();
        return ResourcesSubscription::collection($user->todaysSubscriptions());
    }

    public function pastSubscriptions()
    {
        $user = Auth::user();
        return ResourcesSubscription::collection($user->pastSubscriptions());
    }
}