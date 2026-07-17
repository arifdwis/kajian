<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the data that is shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'uid' => $user->uid,
                    'name' => $user->name,
                    'email' => $user->email,
                    'photo' => $user->photo,
                    'photo_url' => $user->photo_url_path,
                    'level' => $user->level,
                    'id_opd' => $user->id_opd,
                    'dark_mode' => $user->dark_mode,
                ] : null,
                'role' => $user ? $user->roles->first()?->slug : null,
                'roles' => $user ? $user->roles->pluck('slug')->toArray() : [],
                'permissions' => $user ? $this->getUserPermissions($user) : [],
                'menu' => $user ? $this->getUserMenu($user) : [],
                'unread_notifications_count' => $user ? $user->notifikasis()->unread()->count() : 0,
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
                'info' => fn() => $request->session()->get('info'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

    /**
     * Get user permissions based on their roles
     */
    protected function getUserPermissions($user): array
    {
        $permissions = [];

        foreach ($user->roles as $role) {
            $rolePermissions = \DB::table('role_permissions')
                ->join('permissions', 'permissions.id', '=', 'role_permissions.permission_id')
                ->where('role_permissions.role_id', $role->id)
                ->pluck('permissions.name')
                ->toArray();

            $permissions = array_merge($permissions, $rolePermissions);
        }

        return array_unique($permissions);
    }

    /**
     * Get dynamic sidebar menu for user
     */
    protected function getUserMenu($user)
    {
        $roles = $user->roles->pluck('slug')->toArray();

        $menus = \App\Models\Menu::where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('title', 'asc')
            ->get();

        return $this->buildMenuTree($menus, null, $roles);
    }

    protected function buildMenuTree($menus, $parentId, $userRoles)
    {
        $branch = [];
        foreach ($menus as $menu) {
            if ($menu->parent_id == $parentId) {
                if ($this->userHasAccessToMenu($menu, $userRoles)) {
                    $children = $this->buildMenuTree($menus, $menu->id, $userRoles);

                    $item = [
                        'id' => $menu->id,
                        'title' => $menu->title,
                        'route' => $menu->route,
                        'icon' => $menu->icon,
                        'children' => $children
                    ];

                    $branch[] = $item;
                }
            }
        }
        return $branch;
    }

    protected function userHasAccessToMenu($menu, $userRoles)
    {
        if (empty($menu->roles)) {
            return true;
        }

        $allowedRoles = explode(',', $menu->roles);
        $allowedRoles = array_map('trim', $allowedRoles);

        return !empty(array_intersect($userRoles, $allowedRoles));
    }
}
