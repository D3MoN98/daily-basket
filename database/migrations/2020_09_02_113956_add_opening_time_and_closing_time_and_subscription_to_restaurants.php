<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOpeningTimeAndClosingTimeAndSubscriptionToRestaurants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->string('cuisines')->nullable();
            $table->time('opening_time', 0)->nullable();
            $table->time('closing_time', 0)->nullable();
            $table->enum('subscription', [0, 1])->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn('opening_time');
            $table->dropColumn('closing_time');
            $table->dropColumn('subscription');
        });
    }
}