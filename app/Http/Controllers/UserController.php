<?php

namespace App\Http\Controllers;

use App\Address;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public function userStoreAddresses(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'house_no' => 'required',
                'address' => 'required',
                'landmark' => 'required',
                'type' => 'required',
                'longitude' => 'required',
                'latitude' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if ($request->type === 'home') {
                $home_address = Address::where(['type' => 'home']);
                if ($home_address->count() > 0) {
                    $home_address->first()->update([
                        'type' => 'other'
                    ]);
                }
            }

            $id = Auth::id();

            $address = Address::create([
                'user_id' => $id,
                'house_no' => $request->house_no,
                'address' => $request->address,
                'landmark' => $request->landmark,
                'type' => $request->type,
                'longitude' => $request->longitude,
                'latitude' => $request->latitude
            ]);

            return response()->json(['success' => 'Successfully inserted', 'address' => $address]);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }
}