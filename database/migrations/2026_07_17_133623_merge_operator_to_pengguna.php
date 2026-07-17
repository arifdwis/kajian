<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $pengguna = \App\Models\Role::where('slug', 'pengguna')->first();
        $operator = \App\Models\Role::where('slug', 'operator')->first();

        if ($pengguna && $operator) {
            // Move users from operator to pengguna
            $users = $operator->users;
            foreach ($users as $user) {
                if (!$user->roles()->where('role_id', $pengguna->id)->exists()) {
                    $user->roles()->attach($pengguna->id);
                }
                $user->roles()->detach($operator->id);
            }

            // Copy permissions
            $perms = $operator->permissions->pluck('id')->toArray();
            $pengguna->permissions()->syncWithoutDetaching($perms);

            $operator->delete();
        }
    }

    public function down(): void
    {
        \App\Models\Role::firstOrCreate(
            ['slug' => 'operator'],
            ['name' => 'Operator Bidang', 'slug' => 'operator']
        );
    }
};
