<?php

use App\Cuisine;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (is_null(App\User::find(1))) {

            $admin = App\User::create([
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'contact_no' => '6291839827',
                'password' => Hash::make('password')
            ]);

            $admin->roles()->save(App\Role::find(1));

            $admin->addresses()->save(factory(App\Address::class)->make());
        }


        factory(App\User::class, 3)->create()->each(function ($user) {
            $role = rand(4, 4);
            $user->roles()->save(App\Role::find($role));
            $user->addresses()->save(factory(App\Address::class)->make());

            if ($role == 2) {
                $restaurant = $user->restaurant()->save(factory(App\Restaurant::class)->make());

                App\Menu::create([
                    'user_id' => $user->id,
                    'restaurant_id' => $restaurant->id
                ])->each(function ($menu) {
                    $menu->menu_items()->save(factory(App\MenuItem::class)->make());
                });
            }
        });


        // $users = App\User::all();
        // foreach ($users as $user) {
        //     $user->addresses()->save(factory(App\Address::class)->make());
        // }


        if (App\Cuisine::count() === 0) {
            $ar = [
                'North Indian',
                'Punjabi',
                'Korean',
                'Rajasthani',
                'Bengali',
                'Mughalai',
                'Gujrati',
                'Thai',
                'Chinese',
                'Italian'
            ];

            foreach ($ar as $key) {
                App\Cuisine::create([
                    'added_by' => 1,
                    'name' => $key,
                ]);
            }
        }



        if (App\MenuCategory::count() === 0) {
            $ar = [
                'Lunch',
                'Dinner',
                'Breakfast',
            ];

            foreach ($ar as $key) {
                App\MenuCategory::create([
                    'added_by' => 1,
                    'name' => $key,
                ]);
            }
        }



        if (App\MenuSubCategory::count() === 0) {
            $ar = [
                'North Indian',
                'Punjabi',
                'Korean',
                'Rajasthani',
                'Bengali',
                'Mughalai',
                'Gujrati',
                'Thai',
                'Chinese',
                'Italian'
            ];

            foreach ($ar as $key) {
                App\MenuSubCategory::create([
                    'added_by' => 1,
                    'menu_category_id' => NULL,
                    'name' => $key,
                ]);
            }
        }
    }
}