<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuSubCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_sub_categories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('added_by')->unsigned();
            $table->foreign('added_by')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('menu_category_id')->unsigned();
            $table->foreign('menu_category_id')->references('id')->on('menu_categories')->onDelete('cascade');
            $table->string('name');
            $table->string('description')->nullable();
            $table->enum('is_active', [0, 1])->default(1);
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
        Schema::dropIfExists('menu_sub_categories');
    }
}
