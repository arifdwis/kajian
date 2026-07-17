<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can manage settings users.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('settings.users.index');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('settings.users.create');
    }

    public function update(User $user): bool
    {
        return $user->hasPermission('settings.users.edit');
    }

    public function delete(User $user, User $model): bool
    {
        return $user->hasPermission('settings.users.destroy') && $user->id !== $model->id;
    }
}
