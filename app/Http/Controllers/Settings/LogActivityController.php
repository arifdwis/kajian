<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogActivityController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('settings.log-activity.index');

        $query = AuditLog::with('user');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('action', 'like', "%{$search}%")
                  ->orWhereHas('user', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
        }

        $logs = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        return Inertia::render('Backend/Settings/LogActivity/Index', [
            'logs' => $logs,
            'filters' => $request->all(),
        ]);
    }

    public function show($id)
    {
        $this->authorizePermission('settings.log-activity.show');

        $log = AuditLog::with('user')->findOrFail($id);

        return response()->json($log);
    }

    public function destroy($id)
    {
        $this->authorizePermission('settings.log-activity.destroy');

        $log = AuditLog::findOrFail($id);
        $log->delete();

        return redirect()->back()->with('success', 'Log aktivitas berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
