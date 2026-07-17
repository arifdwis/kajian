<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/**
 * 🗄️ Backup Database & Storage
 */
Artisan::command('app:backup', function () {
    $this->info('Memulai pencadangan (backup) database SIKAJIAN...');
    
    try {
        $tables = DB::select('SHOW TABLES');
        $dbName = config('database.connections.mysql.database');
        $keyName = 'Tables_in_' . $dbName;
        
        $sql = "-- SIKAJIAN Database Backup\n";
        $sql .= "-- Waktu: " . now()->toDateTimeString() . "\n\n";
        $sql .= "SET FOREIGN_KEY_CHECKS=0;\n\n";
        
        foreach ($tables as $table) {
            $tableName = $table->$keyName;
            $this->line("Membackup tabel: {$tableName}");
            
            // 1. Show Create Table
            $createTable = DB::select("SHOW CREATE TABLE `{$tableName}`");
            $sql .= $createTable[0]->{'Create Table'} . ";\n\n";
            
            // 2. Dump data
            $rows = DB::table($tableName)->get();
            foreach ($rows as $row) {
                $rowArray = (array) $row;
                $keys = array_map(fn($k) => "`{$k}`", array_keys($rowArray));
                $values = array_map(function($v) {
                    if (is_null($v)) return 'NULL';
                    return DB::getPdo()->quote($v);
                }, array_values($rowArray));
                
                $sql .= "INSERT INTO `{$tableName}` (" . implode(', ', $keys) . ") VALUES (" . implode(', ', $values) . ");\n";
            }
            $sql .= "\n";
        }
        
        $sql .= "SET FOREIGN_KEY_CHECKS=1;\n";
        
        $backupDir = storage_path('app/backups');
        if (!File::exists($backupDir)) {
            File::makeDirectory($backupDir, 0755, true);
        }
        
        $filename = 'backup_' . now()->format('Y-m-d_H-i-s') . '.sql';
        $filepath = $backupDir . '/' . $filename;
        File::put($filepath, $sql);
        
        $this->info("Backup database berhasil disimpan di: " . $filepath);
    } catch (\Exception $e) {
        $this->error('Gagal melakukan backup database: ' . $e->getMessage());
    }
})->purpose('Backup SIKAJIAN database as SQL file');

/**
 * 🗄️ Restore Database
 */
Artisan::command('app:restore {filename}', function ($filename) {
    $this->warn('⚠️ PERINGATAN: Mengembalikan database akan menimpa data yang ada saat ini!');
    if (!$this->confirm('Apakah Anda yakin ingin melanjutkan proses restore ini?')) {
        $this->info('Proses restore dibatalkan.');
        return;
    }
    
    $filepath = storage_path('app/backups/' . $filename);
    if (!File::exists($filepath)) {
        $this->error("Berkas backup tidak ditemukan di: " . $filepath);
        return;
    }
    
    $this->info("Membaca berkas backup: " . $filename);
    
    try {
        DB::unprepared(File::get($filepath));
        $this->info("Database berhasil dipulihkan (restore) dari " . $filename);
    } catch (\Exception $e) {
        $this->error("Gagal melakukan restore: " . $e->getMessage());
    }
})->purpose('Restore SIKAJIAN database from backup SQL file');
