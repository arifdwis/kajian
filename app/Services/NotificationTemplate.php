<?php

namespace App\Services;

class NotificationTemplate
{
    /**
     * Get WhatsApp / In-app notification text for a newly created kajian
     */
    public static function created(string $title, string $creatorName): string
    {
        return "*Kajian Baru Dibuat*\n\n"
             . "Kajian baru berjudul: \"{$title}\" telah dibuat oleh {$creatorName} dan saat ini menunggu proses review/validasi dari Admin Bapperida.";
    }

    /**
     * Get notification text for when a kajian is published
     */
    public static function published(string $title): string
    {
        return "*Kajian Dipublikasikan*\n\n"
             . "Selamat! Kajian Anda yang berjudul: \"{$title}\" telah dipublikasikan dan saat ini sudah dapat diakses oleh publik.";
    }

    /**
     * Get notification text for when a kajian is archived
     */
    public static function archived(string $title): string
    {
        return "*Kajian Diarsipkan*\n\n"
             . "Kajian berjudul: \"{$title}\" telah diarsipkan oleh sistem.";
    }

    /**
     * Get notification text for review request
     */
    public static function review(string $title): string
    {
        return "*Review Kajian Diperlukan*\n\n"
             . "Kajian berjudul: \"{$title}\" memerlukan review dan approval Anda sebelum dipublikasikan.";
    }
}
