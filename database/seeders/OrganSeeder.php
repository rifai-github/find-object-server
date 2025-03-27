<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganSeeder extends Seeder
{
    public function run()
    {
        DB::table('organs')->insert([
            ['id' => 1, 'name' => 'Ginjal'],
            ['id' => 2, 'name' => 'Hati'],
            ['id' => 3, 'name' => 'Jantung'],
            ['id' => 4, 'name' => 'KantungKemih'],
            ['id' => 5, 'name' => 'Lambung'],
            ['id' => 6, 'name' => 'Otak'],
            ['id' => 7, 'name' => 'ParuParu'],
            ['id' => 8, 'name' => 'Pankreas'],
            ['id' => 9, 'name' => 'Usus'],
        ]);
    }
}