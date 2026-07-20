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

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', "%{$search}%")
                  ->orWhere('model_type', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by action
        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        // Filter by model type
        if ($request->filled('model_type')) {
            $query->where('model_type', $request->model_type);
        }

        // Date filter
        if ($request->filled('date_from')) {
            $query->where('created_at', '>=', $request->date_from . ' 00:00:00');
        }
        if ($request->filled('date_to')) {
            $query->where('created_at', '<=', $request->date_to . ' 23:59:59');
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
