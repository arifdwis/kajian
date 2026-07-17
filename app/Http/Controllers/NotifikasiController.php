<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotifikasiController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()->notifikasis()
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Backend/Notifikasi/Index', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(Request $request, $uuid)
    {
        $notif = Notifikasi::where('uuid', $uuid)
            ->where('id_user', $request->user()->id)
            ->firstOrFail();

        $notif->markAsRead();

        return redirect()->back()->with('success', 'Notifikasi ditandai telah dibaca.');
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()->notifikasis()->unread()->update([
            'is_read' => true,
            'read_at' => now()
        ]);

        return redirect()->back()->with('success', 'Semua notifikasi ditandai telah dibaca.');
    }
}
