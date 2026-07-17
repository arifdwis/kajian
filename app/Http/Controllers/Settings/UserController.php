<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('settings.users.index');

        $query = User::with(['roles']);

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Backend/Settings/Users/Index', [
            'users' => $users,
            'filters' => $request->all(),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('settings.users.create');

        return Inertia::render('Backend/Settings/Users/Create', [
            'roles' => Role::all(),
            'bidangs' => Bidang::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('settings.users.create');

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role_id' => 'required|exists:roles,id',
            'id_opd' => 'nullable|exists:bidangs,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_opd' => $request->id_opd,
        ]);

        $user->roles()->attach($request->role_id);

        return redirect()->route('settings.users.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $this->authorizePermission('settings.users.edit');

        $user = User::with('roles')->findOrFail($id);

        return Inertia::render('Backend/Settings/Users/Edit', [
            'user' => $user,
            'roles' => Role::all(),
            'bidangs' => Bidang::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('settings.users.edit');

        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'role_id' => 'required|exists:roles,id',
            'id_opd' => 'nullable|exists:bidangs,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'id_opd' => $request->id_opd,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        $user->roles()->sync([$request->role_id]);

        return redirect()->route('settings.users.index')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('settings.users.destroy');

        $user = User::findOrFail($id);
        
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('settings.users.index')->with('success', 'User berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
