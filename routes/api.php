<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('customer/sign-up', 'AuthController@customer_signup');
Route::post('seller/sign-up', 'AuthController@seller_signup');
Route::post('delivery/sign-up', 'AuthController@delivery_boy_signup');
Route::post('login', 'AuthController@login');

//restaurant
Route::get('restaurants/trending', 'RestaurantController@trending');
Route::get('restaurants/new', 'RestaurantController@new');
Route::get('restaurants/premium', 'RestaurantController@premium');
Route::get('restaurant/{slug}', 'RestaurantController@show');
Route::post('search', 'RestaurantController@search');


//menu
Route::get('menu/{id}/{veg?}', 'MenuController@show');


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'UserController@index');
    Route::put('user/update', 'UserController@update');
    Route::get('user/addresses', 'AuthController@userAddresses');
    Route::post('user/address', 'UserController@userStoreAddresses');
    Route::get('user/address/{id}', 'UserController@getAddressById');
    Route::put('user/address/{id}', 'UserController@updateAddress');
    Route::delete('user/address/{id}', 'UserController@deleteAddress');
    Route::resource('cart', 'CartController');
    Route::delete('cart/all', 'CartController@destroy_all');
    Route::post('checkout', 'CheckoutController@store');
    Route::get('order/current/', 'OrderController@currentOrders');
    Route::get('order/past/', 'OrderController@pastOrders');
    Route::get('subscription/current/', 'SubscriptionController@currentSubscriptions');
    Route::get('subscription/past/', 'SubscriptionController@pastSubscriptions');
});


Route::middleware(['auth:sanctum', 'checkrole:seller'])->namespace('Seller')->prefix('seller/')->group(function () {
    Route::get('order/today/{type?}', 'OrderController@todaysOrder');
    Route::get('order/past/{type?}', 'OrderController@pastOrder');
    Route::get('order/current/{type?}', 'OrderController@currentOrder');
    Route::get('subscription/current/{type?}', 'OrderController@currentSubscription');
    Route::get('subscription/past/{type?}', 'OrderController@pastSubscription');
    Route::get('delivery_boy', 'OrderController@getDeleveryBoys');
    Route::put('order/assign/{id}', 'OrderController@assignOrder');
    Route::put('order/delivered/{id}', 'OrderController@orderDelivered');

    Route::resource('menu', 'MenuController');
    Route::get('menu/change-availablility/{id}', 'MenuController@change_item_available');
    Route::get('restaurant', 'RestaurantController@show');
    Route::post('restaurant', 'RestaurantController@update');
    Route::get('cuisines', 'RestaurantController@cuisines');
    Route::get('menu_categories', 'RestaurantController@menu_categories');
    Route::get('menu_sub_categories', 'RestaurantController@menu_sub_categories');

    Route::post('kitchen-staff/sign-up', 'KitchenController@store');
    Route::get('kitchen-staff', 'KitchenController@index');
    Route::get('kitchen-staff/change-active/{id}', 'KitchenController@changeActive');
});


Route::middleware(['auth:sanctum', 'checkrole:admin'])->namespace('Admin')->prefix('admin/')->group(function () {
    Route::get('restaurant', 'RestaurantController@index');
});