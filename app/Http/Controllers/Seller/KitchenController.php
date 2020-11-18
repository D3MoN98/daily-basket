<?php

namespace App\Http\Controllers\Seller;

use App\Address;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as ResourcesUser;
use App\KitchenStaff;
use App\RoleUser;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Geocoder\Facades\Geocoder;

class KitchenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kitchen_staffs = Auth::user()->kitchen_staffs;
        return ResourcesUser::collection($kitchen_staffs);
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
        $kitchen_staffs = Auth::user()->kitchen_staffs;
        return response()->json(['success' => $kitchen_staffs]);

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'contact_no' => ['required', Rule::unique('users', 'contact_no')],
                'password' => 'required|min:6|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6',
                'house_no' => 'required',
                'address' => 'required',
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
                'role_id' => 5
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

            KitchenStaff::create([
                'user_id' => $user->id,
                'restaurant_id' => Auth::user()->restaurant->id,
                'added_by' => Auth::id()
            ]);

            return response()->json(['success' => 'register successfull']);
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

    public function changeActive($id)
    {
        $kitchen_staff = KitchenStaff::find($id);
        $kitchen_staff->update([
            'is_active' => $kitchen_staff->is_active == 1 ? 0 : 1
        ]);

        return response()->json(['success' => 'kitchen staff active status change']);
    }
}