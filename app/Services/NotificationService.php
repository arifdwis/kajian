<?php

namespace App\Services;

use App\Models\Notifikasi;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send in-app notification and try sending WA notification if phone exists
     */
    public function send(int $userId, string $title, string $message, ?int $kajianId = null): Notifikasi
    {
        // 1. Create In-App Notification
        $notif = Notifikasi::create([
            'id_user' => $userId,
            'from_user_id' => auth()->id(),
            'id_kajian' => $kajianId,
            'title' => $title,
            'message' => $message,
            'type' => 'status',
        ]);

        // 2. Try sending WhatsApp
        $user = User::find($userId);
        if ($user && !empty($user->phone)) {
            $this->sendWhatsApp($user->phone, $message);
        }

        return $notif;
    }

    /**
     * Call Pemkot Samarinda's WA Gateway API
     */
    protected function sendWhatsApp(string $phone, string $message): void
    {
        $url = env('WA_GATEWAY_URL');
        $user = env('WA_GATEWAY_USER');
        $pass = env('WA_GATEWAY_PASS');

        if (empty($url) || empty($user) || empty($pass)) {
            Log::info("WA Gateway: Creds missing, logging message instead: To: {$phone}, Msg: {$message}");
            return;
        }

        try {
            // Clean phone format
            $phone = preg_replace('/[^0-9]/', '', $phone);
            if (str_starts_with($phone, '08')) {
                $phone = '628' . substr($phone, 2);
            }

            $response = Http::timeout(5)->post($url, [
                'user' => $user,
                'password' => $pass,
                'to' => $phone,
                'message' => $message,
            ]);

            if ($response->failed()) {
                Log::warning("WA Gateway failed to send to {$phone}. Status: " . $response->status());
            } else {
                Log::info("WA Gateway sent successfully to {$phone}");
            }
        } catch (\Exception $e) {
            Log::error("WA Gateway exception: " . $e->getMessage());
        }
    }
}
