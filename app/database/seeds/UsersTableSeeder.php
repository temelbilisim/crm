<?php

use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

	public function run()
	{
        \Eloquent::unguard();
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
            $username = $faker->userName;
            $email    = $faker->email;
            $password = $faker->password;
			User::create([
                "username" => $username,
                "email"    => $email,
                "password" => $password
			]);
            $this->command->info("# New registered user #");
            $this->command->info("Username : ".$username);
            $this->command->info("Email    : ".$email);
            $this->command->info("Password : ".$password);
		}
	}

}