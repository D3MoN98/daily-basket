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
Route::post('login', 'AuthCOntroller@login');


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::resource('cart', 'CartController');
    Route::post('checkout', 'CheckoutController@store');
});


Route::middleware(['auth:sanctum', 'checkrole:seller'])->namespace('Seller')->prefix('seller/')->group(function () {
    Route::resource('menu', 'MenuController');
    Route::get('menu/change-availablility/{id}', 'MenuController@change_item_available');
});