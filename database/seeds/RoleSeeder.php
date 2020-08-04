<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'admin'
            ],
            [
                'name' => 'seller'
            ],
            [
                'name' => 'customer'
            ]
        ];

        foreach ($roles as $key) {
            Role::create($key);
        }
    }
}
