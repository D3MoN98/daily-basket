<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Address;
// use Faker\Generator as Faker;


$faker = new Faker\Generator();
$faker->addProvider(new Faker\Provider\en_IN\Person($faker));
$faker->addProvider(new Faker\Provider\en_IN\Address($faker));
$faker->addProvider(new Faker\Provider\en_IN\PhoneNumber($faker));

$factory->define(Address::class, function ($faker) {
    return [
        'house_no' => $faker->secondaryAddress,
        'address' => $faker->address,
        'latitude' => $faker->latitude,
        'longitude' => $faker->longitude,
    ];
});
