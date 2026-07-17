<?php

namespace App\Observers;

use App\Models\Kajian;
use App\Models\AuditLog;
use App\Models\Notifikasi;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class KajianObserver
{
    /**
     * Handle the Kajian "creating" event.
     */
    public function creating(Kajian $kajian): void
    {
        if (empty($kajian->slug)) {
            $kajian->slug = Str::slug($kajian->judul) . '-' . rand(1000, 9999);
        }

        if (auth()->check()) {
            if (empty($kajian->created_by)) {
                $kajian->created_by = auth()->id();
            }
        }
    }

    /**
     * Handle the Kajian "updating" event.
     */
    public function updating(Kajian $kajian): void
    {
        if (auth()->check()) {
            $kajian->updated_by = auth()->id();
        }
    }

    /**
     * Handle the Kajian "created" event.
     */
    public function created(Kajian $kajian): void
    {
        Cache::flush();
        $this->logActivity($kajian, 'create', null, $kajian->getAttributes());
        
        // Notify admin about new kajian from operator
        if ($kajian->status === 'draft') {
            $this->createNotificationToRole('admin', 'Kajian Baru Dibuat', "Kajian baru berjudul \"{$kajian->judul}\" telah dibuat dan menunggu review.", $kajian->id);
            $this->createNotificationToRole('superadmin', 'Kajian Baru Dibuat', "Kajian baru berjudul \"{$kajian->judul}\" telah dibuat.", $kajian->id);
        }
    }

    /**
     * Handle the Kajian "updated" event.
     */
    public function updated(Kajian $kajian): void
    {
        Cache::flush();
        // Check if status changed
        if ($kajian->isDirty('status')) {
            $oldStatus = $kajian->getOriginal('status');
            $newStatus = $kajian->status;

            $this->logActivity($kajian, "status_change_{$oldStatus}_to_{$newStatus}", ['status' => $oldStatus], ['status' => $newStatus]);

            // Notifications
            if ($newStatus === 'published') {
                // Notify operator/creator
                $this->createNotification($kajian->created_by, 'Kajian Dipublikasikan', "Kajian Anda yang berjudul \"{$kajian->judul}\" telah dipublikasikan.", $kajian->id);
            } elseif ($newStatus === 'archived') {
                // Notify operator/creator
                $this->createNotification($kajian->created_by, 'Kajian Diarsipkan', "Kajian Anda yang berjudul \"{$kajian->judul}\" telah diarsipkan.", $kajian->id);
            } elseif ($newStatus === 'review') {
                // Notify admins
                $this->createNotificationToRole('admin', 'Kajian Memerlukan Review', "Kajian berjudul \"{$kajian->judul}\" memerlukan review Anda.", $kajian->id);
            }
        } else {
            // General update
            $dirty = $kajian->getDirty();
            $original = [];
            foreach ($dirty as $key => $value) {
                $original[$key] = $kajian->getOriginal($key);
            }
            $this->logActivity($kajian, 'update', $original, $dirty);
        }
    }

    /**
     * Handle the Kajian "deleted" event.
     */
    public function deleted(Kajian $kajian): void
    {
        Cache::flush();
        $this->logActivity($kajian, 'delete', $kajian->getAttributes(), null);
    }

    /**
     * Helper to write audit trail
     */
    protected function logActivity(Kajian $kajian, string $action, ?array $old, ?array $new): void
    {
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'model_type' => Kajian::class,
            'model_id' => $kajian->id,
            'old_values' => $old,
            'new_values' => $new,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Helper to create simple notification for a user
     */
    protected function createNotification(int $userId, string $title, string $message, int $kajianId): void
    {
        Notifikasi::create([
            'id_user' => $userId,
            'from_user_id' => auth()->id(),
            'id_kajian' => $kajianId,
            'title' => $title,
            'message' => $message,
            'type' => 'status',
        ]);
    }

    /**
     * Helper to notify all users with a specific role
     */
    protected function createNotificationToRole(string $roleSlug, string $title, string $message, int $kajianId): void
    {
        $users = User::whereHas('roles', function($q) use ($roleSlug) {
            $q->where('slug', $roleSlug);
        })->get();

        foreach ($users as $user) {
            Notifikasi::create([
                'id_user' => $user->id,
                'from_user_id' => auth()->id(),
                'id_kajian' => $kajianId,
                'title' => $title,
                'message' => $message,
                'type' => 'status',
            ]);
        }
    }
}
