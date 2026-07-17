<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleCoopHeader
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Fix for Google Login Popup blocked by Cross-Origin-Opener-Policy
        $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

        return $response;
    }
}
