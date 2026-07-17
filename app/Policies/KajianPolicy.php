<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Kajian;

class KajianPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('kajian.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Kajian $kajian): bool
    {
        if ($user->hasRole('pengguna')) {
            return $user->hasPermission('kajian.show') && $user->id_opd === $kajian->bidang_id;
        }

        return $user->hasPermission('kajian.show');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('kajian.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Kajian $kajian): bool
    {
        if ($user->hasRole('pengguna')) {
            return $user->hasPermission('kajian.edit') && $user->id_opd === $kajian->bidang_id;
        }

        return $user->hasPermission('kajian.edit');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Kajian $kajian): bool
    {
        return $user->hasPermission('kajian.destroy');
    }

    /**
     * Determine whether the user can publish the model.
     */
    public function publish(User $user, Kajian $kajian): bool
    {
        return $user->hasPermission('kajian.publish');
    }

    /**
     * Determine whether the user can archive the model.
     */
    public function archive(User $user, Kajian $kajian): bool
    {
        return $user->hasPermission('kajian.archive');
    }
}
