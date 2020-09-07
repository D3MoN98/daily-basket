<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('slug')->unique()->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('contact_no')->nullable();
            $table->text('image')->nullable();
            $table->string('gstin_no');
            $table->string('fssai_license_no');
            $table->string('cuisines')->nullable();
            $table->time('opening_time', 0)->nullable();
            $table->time('closing_time', 0)->nullable();
            $table->enum('subscription', [0, 1])->default(1);
            $table->enum('is_verified', [0, 1])->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('restaurants');
    }
}