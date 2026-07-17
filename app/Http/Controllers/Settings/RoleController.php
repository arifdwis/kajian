<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('settings.roles.index');

        $query = Role::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $roles = $query->withCount('users')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Settings/Roles/Index', [
            'roles' => $roles,
            'filters' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('settings.roles.create');

        $request->validate([
            'name' => 'required|string|max:50|unique:roles,name',
        ]);

        Role::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('success', 'Role berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('settings.roles.edit');

        $role = Role::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:50|unique:roles,name,' . $id,
        ]);

        $role->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('success', 'Role berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('settings.roles.destroy');

        $role = Role::findOrFail($id);

        if ($role->users()->exists()) {
            return redirect()->back()->with('error', 'Role ini tidak dapat dihapus karena masih dikaitkan dengan user.');
        }

        $role->delete();

        return redirect()->back()->with('success', 'Role berhasil dihapus.');
    }

    public function permission($id)
    {
        $this->authorizePermission('settings.roles.permission');

        $role = Role::with('permissions')->findOrFail($id);
        $permissions = Permission::all();

        return Inertia::render('Backend/Settings/Roles/Permission', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $role->permissions->pluck('id')->toArray(),
        ]);
    }

    public function updatePermission(Request $request, $id)
    {
        $this->authorizePermission('settings.roles.permission.update');

        $role = Role::findOrFail($id);
        $request->validate([
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->permissions()->sync($request->permissions ?: []);

        return redirect()->route('settings.roles.index')->with('success', 'Hak akses role berhasil disesuaikan.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
