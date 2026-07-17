<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('settings.permissions.index');

        $query = Permission::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $permissions = $query->paginate(15)->withQueryString();

        return Inertia::render('Backend/Settings/Permissions/Index', [
            'permissions' => $permissions,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('settings.permissions.create');
        return Inertia::render('Backend/Settings/Permissions/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('settings.permissions.create');

        $request->validate([
            'name' => 'required|string|max:50|unique:permissions,name',
        ]);

        Permission::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('settings.permissions.index')->with('success', 'Permission berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $this->authorizePermission('settings.permissions.edit');
        $permission = Permission::findOrFail($id);

        return Inertia::render('Backend/Settings/Permissions/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('settings.permissions.edit');

        $permission = Permission::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:50|unique:permissions,name,' . $id,
        ]);

        $permission->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('settings.permissions.index')->with('success', 'Permission berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('settings.permissions.destroy');

        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('settings.permissions.index')->with('success', 'Permission berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
