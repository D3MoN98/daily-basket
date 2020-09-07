<?php

namespace App\Http\Controllers;

use App\Address;
use App\Http\Resources\Restaurant as ResourcesRestaurant;
use App\Http\Resources\User as ResourcesUser;
use App\Http\Resources\Address as ResourcesAddress;
use App\Restaurant;
use App\Role;
use App\RoleUser;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Geocoder\Facades\Geocoder;

class AuthController extends Controller
{

    public function customer_signup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')],
                'password' => 'required|min:6|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6',
                'house_no' => 'required',
                'address' => 'required',
                // 'landmark' => 'required',
                'address_type' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'contact_no' => $request->contact_no,
                'password' => Hash::make($request->password),
            ]);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 3
            ]);

            $coordinate = Geocoder::getCoordinatesForAddress($request->address);

            Address::create([
                'user_id' => $user->id,
                'house_no' => $request->house_no,
                'address' => $request->address,
                'landmark' => $request->landmark,
                'type' => $request->address_type,
                'latitude' => $coordinate['lat'],
                'longitude' => $coordinate['lng'],
            ]);

            return response()->json(['success' => 'register successfull']);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function seller_signup(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')],
                'password' => 'required|min:6|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6',
                'house_no' => 'required',
                'address' => 'required',
                'gstin_no' => 'required',
                'fssai_license_no' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'contact_no' => $request->contact_no,
                'password' => Hash::make($request->password),
            ]);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 2
            ]);

            Restaurant::create([
                'user_id' => $user->id,
                'gstin_no' => $request->gstin_no,
                'fssai_license_no' => $request->fssai_license_no
            ]);

            $coordinate = Geocoder::getCoordinatesForAddress($request->address);

            Address::create([
                'user_id' => $user->id,
                'house_no' => $request->house_no,
                'address' => $request->address,
                'type' => 'home',
                'latitude' => $coordinate['lat'],
                'longitude' => $coordinate['lng'],
            ]);

            return response()->json(['success' => 'register successfull']);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function delivery_boy_signup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')],
                'password' => 'required|min:6|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6',
                'house_no' => 'required',
                'address' => 'required',
                'address_type' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'contact_no' => $request->contact_no,
                'password' => Hash::make($request->password),
            ]);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 4
            ]);

            $coordinate = Geocoder::getCoordinatesForAddress($request->address);

            Address::create([
                'user_id' => $user->id,
                'house_no' => $request->house_no,
                'address' => $request->address,
                'landmark' => $request->landmark,
                'type' => 'home',
                'latitude' => $coordinate['lat'],
                'longitude' => $coordinate['lng'],
            ]);

            return response()->json(['success' => 'register successfull']);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ], [
                'email.required' => 'Email field is required.',
                'email.email' => 'Email field is must be an email.',
                'password.required' => 'Password field is required.'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }


            $user = User::whereEmail($request->email)->with('roles')->first();


            if ($user && Auth::attempt(['email' => $request->email, 'password' => $request->password], true)) {

                $user->role = $user->roles()->first()->name;
                $tokenResult = $user->createToken('auth_token')->plainTextToken;

                return response()->json([
                    'auth_token' => $tokenResult,
                    'token_type' => 'Bearer',
                    'message' => 'login successfull',
                    'user' => $user,
                ]);
            } else {
                return response()->json(['error' => 'credentials not matched', 'email' => $request->email], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function logout()
    {
        try {
            $user = Auth::user();
            $user->tokens()->delete();
            return response()->json(['success' => 'logout successfull']);
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function user(Request $request)
    {
        try {
            return new ResourcesUser(Auth::user());
        } catch (Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }

    public function userAddresses(Request $request)
    {
        return ResourcesAddress::collection(Auth::user()->addresses);
    }

    public function restaurant(Request $request)
    {
        try {
            return new ResourcesRestaurant(Auth::user()->restaurant);
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
        }
    }
}