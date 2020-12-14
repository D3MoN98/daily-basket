<?php

namespace App\Http\Controllers;

use App\Address;
use App\Http\Resources\Address as ResourcesAddress;
use App\user;
use App\Http\Resources\User as ResourcesUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class UserController extends Controller
{

    public function index()
    {
        try {
            return new ResourcesUser(Auth::user());
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $id = Auth::id();

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($id)],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')],
            ], [
                'name.required' => 'Name field is required.',
                'email.required' => 'Email field is required.',
                'email.email' => 'Please proide an valid email address.',
                'contact_no.required' => 'Contact No field is required.',
            ]);


            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            User::findOrFail($id)->update($request->all());

            $user = Auth::user()->fresh();
            $user->role = $user->roles()->first()->name;

            return new ResourcesUser($user);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }



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

    public function getAddressById($id)
    {
        return new ResourcesAddress(Address::find($id));
    }

    public function updateAddress(Request $request, $id)
    {
        $address = Address::find($id);
        $address->update($request->all());
        return response()->json(['success' => 'deleted']);
    }


    public function deleteAddress($id)
    {
        $address = Address::find($id)->delete();
        return response()->json(['success' => 'deleted']);
    }
}