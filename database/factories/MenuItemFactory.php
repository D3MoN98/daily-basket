<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\MenuItem;
use Faker\Generator as Faker;


$factory->define(MenuItem::class, function (Faker $faker, $type) {
    return [
        'name' => $faker->sentence(4, true),
        'description' => $faker->sentence(10, true),
        'type' => $faker->randomElement(['veg', 'non-veg']),
        'price' => $faker->numberBetween(10, 500),
        'gst' => $faker->randomElement([5, 10, 15]),
        'delivery_charge' => $faker->randomElement([5, 10, 20, 30, 40, 50]),
        'image' => $faker->imageUrl(640, 480),
    ];
});
