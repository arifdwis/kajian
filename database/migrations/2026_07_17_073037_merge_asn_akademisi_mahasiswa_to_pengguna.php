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
        // Find or create the 'pengguna' role
        $pengguna = \App\Models\Role::firstOrCreate(
            ['slug' => 'pengguna'],
            ['name' => 'Pengguna', 'slug' => 'pengguna']
        );

        // Find the old roles
        $oldSlugs = ['asn', 'akademisi', 'mahasiswa'];
        $oldRoles = \App\Models\Role::whereIn('slug', $oldSlugs)->get();

        foreach ($oldRoles as $oldRole) {
            // Move all users from old role to pengguna
            $users = $oldRole->users;
            foreach ($users as $user) {
                if (!$user->roles()->where('role_id', $pengguna->id)->exists()) {
                    $user->roles()->attach($pengguna->id);
                }
                $user->roles()->detach($oldRole->id);
            }

            // Copy permissions from old role to pengguna if not already assigned
            $perms = $oldRole->permissions->pluck('id')->toArray();
            $pengguna->permissions()->syncWithoutDetaching($perms);

            // Delete the old role
            $oldRole->delete();
        }
    }

    public function down(): void
    {
        // Reverse: recreate the old roles (without data)
        $oldRoles = [
            ['name' => 'ASN Pemerintah Kota', 'slug' => 'asn'],
            ['name' => 'Akademisi', 'slug' => 'akademisi'],
            ['name' => 'Mahasiswa', 'slug' => 'mahasiswa'],
        ];
        foreach ($oldRoles as $role) {
            \App\Models\Role::firstOrCreate(['slug' => $role['slug']], $role);
        }
    }
};
