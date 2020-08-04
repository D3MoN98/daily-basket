<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('menu_id')->unsigned();
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['veg', 'non-veg']);
            $table->bigInteger('menu_category_id')->unsigned()->nullable();
            $table->foreign('menu_category_id')->references('id')->on('menu_categories');
            $table->bigInteger('menu_sub_category_id')->unsigned()->nullable();
            $table->foreign('menu_sub_category_id')->references('id')->on('menu_sub_categories');
            $table->bigInteger('cuisine_id')->unsigned()->nullable();
            $table->foreign('cuisine_id')->references('id')->on('cuisines');
            $table->integer('quantity_serves_per_day')->nullable();
            $table->text('image')->nullable();
            $table->float('price');
            $table->float('gst');
            $table->float('delivery_charge');
            $table->integer('sort_order')->nullable();
            $table->enum('is_available', [0, 1])->default(1);
            $table->enum('status', ['pending', 'cancelled', 'approved'])->default('pending');
            $table->bigInteger('approved_by')->unsigned()->nullable();
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamp('approved_on')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('menu_items');
    }
}
