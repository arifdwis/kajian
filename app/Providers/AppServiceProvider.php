<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Models\Kajian;
use App\Observers\KajianObserver;

use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Kajian::observe(KajianObserver::class);

        // Dynamic Gate checks based on custom RBAC tables
        Gate::before(function ($user, $ability) {
            if ($user->hasRole('superadmin')) {
                return true;
            }
            return $user->hasPermission($ability) ? true : null;
        });
    }
}
