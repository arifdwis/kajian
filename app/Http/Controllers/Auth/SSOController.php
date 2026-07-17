<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Novay\SSO\Services\Broker;
use Carbon\Carbon;

class SSOController extends Controller
{
    protected $redirectTo = '/dashboard';

    public function login()
    {
        try {
            new Broker();
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::warning('SSO: Pre-attach broker init failed, continuing without it', [
                'error' => $e->getMessage(),
            ]);
        }

        $queries = http_build_query([
            'name' => config('sso.broker_name'),
            'secret' => config('sso.broker_secret'),
            'redirect_uri' => urlencode(url('/oauth/sso/callback')),
            'response_type' => 'code',
        ]);

        return redirect(config('sso.server_url') . '/oauth/sso/authorize?' . $queries);
    }

    public function callback(Request $request)
    {
        Log::info('SSO Callback received', ['params' => $request->all()]);

        try {
            $broker = new Broker();

            if ($request->filled('code') && $request->filled('uid') && $request->filled('pwd')) {
                $username = base64_decode($request->uid);
                $password = base64_decode($request->pwd);

                try {
                    $loginResult = $broker->login($username, $password);
                    if ($loginResult) {
                        $request->session()->regenerate();
                        $this->syncUserFromSSO($broker);
                        return redirect()->to($this->redirectTo);
                    }
                } catch (\Exception $e) {
                    Log::error('SSO: Broker login error', ['error' => $e->getMessage()]);
                }

                try {
                    if ($broker->token($request->code)) {
                        $request->session()->regenerate();
                        $this->syncUserFromSSO($broker);
                        return redirect()->to($this->redirectTo);
                    }
                } catch (\Exception $e) {
                    Log::error('SSO: Token fallback error', ['error' => $e->getMessage()]);
                }

                $codeParts = explode('.', $request->code);
                if (count($codeParts) === 3) {
                    $payload = json_decode(base64_decode($codeParts[1]), true);
                    if (isset($payload['sub'])) {
                        $user = $this->createOrUpdateUserFromJWT($payload, $username);
                        if ($user) {
                            Auth::login($user, true);
                            $request->session()->regenerate();
                            return redirect()->to($this->redirectTo);
                        }
                    }
                }
            }

            if ($request->filled('code') && !$request->filled('uid') && !$request->filled('pwd')) {
                if ($broker->token($request->code)) {
                    $request->session()->regenerate();
                    $this->syncUserFromSSO($broker);
                    return redirect()->to($this->redirectTo);
                }
            }

            return redirect()->route('login')->with('error', 'Tidak dapat terhubung dengan SSO. Silakan coba lagi.');

        } catch (\Exception $e) {
            Log::error('SSO Callback Error: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    protected function createOrUpdateUserFromJWT(array $payload, string $email)
    {
        try {
            $user = User::where('uid', $payload['sub'])
                ->orWhere('email', $email)
                ->first();

            $userData = [
                'uid' => $payload['sub'],
                'email' => $email,
                'name' => explode('@', $email)[0],
                'last_login' => Carbon::now(),
                'last_ip_address' => request()->ip(),
            ];

            if ($user) {
                $user->update($userData);
            } else {
                $user = User::create($userData);
                $user->assignRole('pengguna'); // Default role from SSO Government
            }

            return $user;
        } catch (\Exception $e) {
            Log::error('SSO: createOrUpdateUserFromJWT error', ['error' => $e->getMessage()]);
            return null;
        }
    }

    protected function syncUserFromSSO(Broker $broker)
    {
        try {
            $response = $broker->getUserInfo();
            if (!isset($response['data'])) {
                return;
            }

            $sso = $response['data'];

            $user = User::where('uid', $sso['id'])
                ->orWhere('email', $sso['email'])
                ->first();

            $userData = [
                'uid' => $sso['id'],
                'name' => $sso['name'],
                'email' => $sso['email'],
                'phone' => $sso['phone'] ?? null,
                'photo' => $sso['photo'] ?? null,
                'last_login' => Carbon::now(),
                'last_ip_address' => request()->ip(),
            ];

            if ($user) {
                $user->update($userData);
            } else {
                $user = User::create($userData);
            }

            // Assign 'pengguna' role if user has no role yet
            if ($user->roles()->count() === 0) {
                $user->assignRole('pengguna');
            }

            $this->linkUserToBidang($user, $sso);

            Auth::login($user, true);

        } catch (\Exception $e) {
            Log::error('SSO syncUserFromSSO Error: ' . $e->getMessage());
        }
    }

    protected function linkUserToBidang(User $user, array $sso): void
    {
        try {
            if (!empty($user->id_opd)) {
                return;
            }

            $unitName = $sso['unit_name'] ?? $sso['unit_kerja'] ?? null;
            if (!$unitName) {
                return;
            }

            // Find matching Bidang
            $bidang = Bidang::where('nama', 'LIKE', '%' . $unitName . '%')->first();

            if ($bidang) {
                $user->update(['id_opd' => $bidang->id]);
            }
        } catch (\Exception $e) {
            Log::error('SSO linkUserToBidang Error: ' . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        try {
            $broker = new Broker();
            $broker->logout();
        } catch (\Exception $e) {}

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
