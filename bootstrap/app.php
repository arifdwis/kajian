<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\HandleCoopHeader::class,
            \App\Http\Middleware\SSOAutoLogin::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->respond(function ($response, $e, Request $request) {
            if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return Inertia\Inertia::render('Backend/Error', [
                    'status' => $response->getStatusCode()
                ])
                ->toResponse($request)
                ->setStatusCode($response->getStatusCode());
            }
            return $response;
        });
    })->create();
