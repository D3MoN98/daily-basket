<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusAndIsDeliveredAndDeliveredAtToSubscriptionDeliveriessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscription_deliveries', function (Blueprint $table) {
            $table->enum('status', ['prepared', 'out for delivey', 'delivered'])->nullable()->after('delivery_assigned_to');
            $table->enum('is_delivered', [0, 1])->default(0)->after('status');
            $table->timestamp('delivered_at')->nullable()->after('is_delivered');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscription_deliveries', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('is_delivered');
            $table->dropColumn('delivered_at');
        });
    }
}