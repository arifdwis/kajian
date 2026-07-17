<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $this->authorizePermission('settings.menu.index');

        $menus = Menu::with(['children'])->whereNull('parent_id')->orderBy('order')->get();
        $roles = Role::all();

        return Inertia::render('Backend/Settings/Menus/Index', [
            'menus' => $menus,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('settings.menu.index');

        $request->validate([
            'title' => 'required|string|max:100',
            'route' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'permission_name' => 'nullable|string|max:100',
            'roles' => 'nullable|array',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $rolesString = $request->roles ? implode(',', $request->roles) : null;

        $maxOrder = Menu::where('parent_id', $request->parent_id)->max('order') ?? 0;

        Menu::create([
            'title' => $request->title,
            'route' => $request->route,
            'icon' => $request->icon,
            'permission_name' => $request->permission_name,
            'roles' => $rolesString,
            'parent_id' => $request->parent_id,
            'order' => $maxOrder + 1,
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'Menu berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('settings.menu.index');

        $menu = Menu::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:100',
            'route' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'permission_name' => 'nullable|string|max:100',
            'roles' => 'nullable|array',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $rolesString = $request->roles ? implode(',', $request->roles) : null;

        $menu->update([
            'title' => $request->title,
            'route' => $request->route,
            'icon' => $request->icon,
            'permission_name' => $request->permission_name,
            'roles' => $rolesString,
            'parent_id' => $request->parent_id,
        ]);

        return redirect()->back()->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('settings.menu.index');

        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->back()->with('success', 'Menu berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $this->authorizePermission('settings.menu.index');

        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:menus,id',
        ]);

        foreach ($request->ids as $index => $id) {
            Menu::where('id', $id)->update(['order' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Urutan menu berhasil disesuaikan.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
