<?php

namespace App\Observers;

use App\Models\User;
use App\Models\AuditLog;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $this->logActivity($user, 'create', null, $user->getAttributes());
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $dirty = $user->getDirty();
        $original = [];
        foreach ($dirty as $key => $value) {
            $original[$key] = $user->getOriginal($key);
        }
        $this->logActivity($user, 'update', $original, $dirty);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        $this->logActivity($user, 'delete', $user->getAttributes(), null);
    }

    /**
     * Helper to write audit trail
     */
    protected function logActivity(User $user, string $action, ?array $old, ?array $new): void
    {
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'model_type' => User::class,
            'model_id' => $user->id,
            'old_values' => $old,
            'new_values' => $new,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
