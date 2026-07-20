<?php

namespace App\Observers;

use App\Models\Kajian;
use App\Models\Notifikasi;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class KajianObserver
{
    /**
     * Handle the Kajian "creating" event.
     */
    public function creating(Kajian $kajian): void
    {
        if (empty($kajian->slug)) {
            $kajian->slug = \Illuminate\Support\Str::slug($kajian->judul) . '-' . rand(1000, 9999);
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

        if ($kajian->isDirty('status')) {
            $newStatus = $kajian->status;

            if ($newStatus === 'published') {
                $this->createNotification($kajian->created_by, 'Kajian Dipublikasikan', "Kajian Anda yang berjudul \"{$kajian->judul}\" telah dipublikasikan.", $kajian->id);
            } elseif ($newStatus === 'archived') {
                $this->createNotification($kajian->created_by, 'Kajian Diarsipkan', "Kajian Anda yang berjudul \"{$kajian->judul}\" telah diarsipkan.", $kajian->id);
            } elseif ($newStatus === 'review') {
                $this->createNotificationToRole('admin', 'Kajian Memerlukan Review', "Kajian berjudul \"{$kajian->judul}\" memerlukan review Anda.", $kajian->id);
            }
        }
    }

    /**
     * Handle the Kajian "deleted" event.
     */
    public function deleted(Kajian $kajian): void
    {
        Cache::flush();
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
