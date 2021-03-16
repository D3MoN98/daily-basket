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

Route::post('forgot-password', 'AuthController@forget_password')->middleware('guest')->name('password.email');
Route::get('reset-password/{token}', 'AuthController@reset_password_token')->middleware('guest')->name('password.reset');
Route::post('reset-password', 'AuthController@reset_password')->middleware('guest')->name('password.update');

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

    Route::get('feedback/check/', 'FeedbackController@check');
    Route::resource('feedback', 'FeedbackController');
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

    Route::put('order/status/update/{id}', 'OrderController@updateStatus');


    Route::resource('menu', 'MenuController');
    Route::get('menu/change-availablility/{id}', 'MenuController@change_item_available');
    Route::get('restaurant', 'RestaurantController@show');
    Route::post('restaurant', 'RestaurantController@update');
    Route::post('restaurant/image', 'RestaurantController@update_image');
    Route::get('cuisines', 'RestaurantController@cuisines');
    Route::get('menu_categories', 'RestaurantController@menu_categories');
    Route::get('menu_sub_categories', 'RestaurantController@menu_sub_categories');

    Route::post('kitchen-staff/sign-up', 'KitchenController@store');
    Route::get('kitchen-staff', 'KitchenController@index');
    Route::post('kitchen-staff/change-active/{id}', 'KitchenController@changeActive');

    Route::post('delivery-boy/sign-up', 'DeliveryBOyController@store');

    Route::get('feedback', 'FeedbackController@index');

    Route::get('customer', 'UserController@index');

    Route::get('count-overview', 'SellerController@countOverview');
});


Route::middleware(['auth:sanctum', 'checkrole:kitchen-staff'])->namespace('Kitchen')->prefix('kitchen-staff/')->group(function () {
    Route::get('order', 'OrderController@index');
    Route::get('subscription', 'SubscriptionController@index');
    Route::put('order_item/status/update/{id}', 'OrderController@updateStatus');
    Route::put('subscription_item/status/update/{id}', 'SubscriptionController@updateStatus');
});

Route::middleware(['auth:sanctum', 'checkrole:delivery-boy'])->namespace('Delivery')->prefix('delivery-boy/')->group(function () {
    Route::get('order', 'OrderController@index');
    Route::put('order/{id}', 'OrderController@update');
});

Route::middleware(['auth:sanctum', 'checkrole:admin'])->namespace('Admin')->prefix('admin/')->group(function () {
    Route::get('restaurant', 'RestaurantController@index');
    Route::post('restaurant/update/verification/{id}', 'RestaurantController@update_verification');
});