<?php

use App\Cuisine;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // factory(App\User::class, 3)->create()->each(function ($user) {
        //     $role = rand(3, 3);
        //     $user->roles()->save(App\Role::find($role));
        //     $user->addresses()->save(factory(App\Address::class)->make());

        //     if ($role == 2) {
        //         $restaurant = $user->restaurant()->save(factory(App\Restaurant::class)->make());

        //         App\Menu::create([
        //             'user_id' => $user->id,
        //             'restaurant_id' => $restaurant->id
        //         ])->each(function ($menu) {
        //             $menu->menu_items()->save(factory(App\MenuItem::class)->make());
        //         });
        //     }
        // });

        // $ar = [
        //     'North Indian',
        //     'Punjabi',
        //     'Korean',
        //     'Rajasthani',
        //     'Bengali',
        //     'Mughalai',
        //     'Gujrati',
        //     'Thai',
        //     'Chinese',
        //     'Italian'
        // ];

        // foreach ($ar as $key) {
        //     Cuisine::create([
        //         'added_by' => 4,
        //         'name' => $key,
        //     ]);
        // }

        $users = App\User::all();
        foreach ($users as $user) {
            $user->addresses()->save(factory(App\Address::class)->make());
        }
    }
}