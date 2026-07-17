<?php

namespace App\Services;

use Illuminate\Support\Collection;

class ExportService
{
    /**
     * Export publications data to CSV format
     */
    public function exportToCsv(Collection $kajians): string
    {
        $filename = 'export_kajian_' . date('Ymd_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];

        $callback = function() use ($kajians) {
            $file = fopen('php://output', 'w');
            
            // Add UTF-8 BOM for Excel compatibility
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            // Headers
            fputcsv($file, [
                'No',
                'Judul Kajian',
                'Tahun',
                'Bidang Kajian',
                'Jenis Kajian',
                'Tanggal Pelaksanaan',
                'Lokasi',
                'Penanggung Jawab',
                'Koordinator',
                'Mitra',
                'Ringkasan',
                'Temuan Utama',
                'Rekomendasi Kebijakan',
                'Status',
                'Total View',
                'Total Download',
                'Versi'
            ]);

            // Rows
            foreach ($kajians as $index => $k) {
                fputcsv($file, [
                    $index + 1,
                    $k->judul,
                    $k->tahun?->tahun ?? '-',
                    $k->bidang?->nama ?? '-',
                    $k->jenisKajian?->nama ?? '-',
                    $k->tanggal?->format('d-m-Y') ?? '-',
                    $k->lokasi ?? '-',
                    $k->penanggung_jawab ?? '-',
                    $k->koordinator ?? '-',
                    $k->mitra ?? '-',
                    strip_tags($k->ringkasan),
                    strip_tags($k->temuan),
                    strip_tags($k->rekomendasi),
                    ucfirst($k->status),
                    $k->view_count,
                    $k->download_count,
                    $k->version
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
