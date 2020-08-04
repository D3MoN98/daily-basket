<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Restaurant;
// use Faker\Generator as Faker;

$faker = new Faker\Generator();
$faker->addProvider(new Faker\Provider\en_IN\Person($faker));
$faker->addProvider(new Faker\Provider\en_IN\Address($faker));
$faker->addProvider(new Faker\Provider\en_IN\PhoneNumber($faker));
$faker->addProvider(new Faker\Provider\Lorem($faker));


$factory->define(Restaurant::class, function ($faker) {
    return [
        'name' => $faker->sentence(4, true),
        'description' => $faker->sentence(10, true),
        'contact_no' => $faker->phoneNumber,
        'image' => $faker->imageUrl(640, 480),
        'gstin_no' => $faker->md5,
        'fssai_license_no' => $faker->md5
    ];
});
