<?php

use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

	public function run()
	{
        \Eloquent::unguard();
		$faker = Faker::create();

        $num = $this->command->ask("How many you want add user? ");

        if(!is_numeric($num)){
            $this->command->error($num." is not numeric!");
            return false;
        } else {
            if($num > 500){
                if(!$this->command->confirm("You want add ".$num." user to table. Do you wish to continue? [yes|no]")){
                    $this->command->error("Canceled");
                    return false;
                }
                $confirm = true;
            } else {
                $confirm = true;
            }
        }

        if($confirm){
            foreach (range(1, $num) as $index) {
                $username = $faker->userName;
                $email = $faker->email;
                $password = $faker->password;
                User::create([
                    "username" => $username,
                    "email" => $email,
                    "password" => $password
                ]);
                $this->command->info("# New registered user #");
                $this->command->info("Username : " . $username);
                $this->command->info("Email    : " . $email);
                $this->command->info("Password : " . $password);
            }
        }
	}

}