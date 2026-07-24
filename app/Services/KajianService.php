<?php

namespace App\Services;

use App\Models\Kajian;
use App\Models\KajianFile;
use App\Models\KajianGallery;
use App\Models\KajianVersion;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KajianService
{
    /**
     * Store or update a file attachment for a Kajian
     */
    public function uploadFile(Kajian $kajian, UploadedFile $file, string $type): KajianFile
    {
        // Delete existing file of the same type
        $existing = $kajian->files()->where('tipe', $type)->first();
        if ($existing) {
            $this->deleteFile($existing);
        }

        $folder = 'kajian/' . $kajian->uuid . '/' . $type;
        $path = $file->store($folder, 's3');

        return KajianFile::create([
            'kajian_id' => $kajian->id,
            'tipe' => $type,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'uploaded_by' => auth()->id() ?? $kajian->created_by,
        ]);
    }

    /**
     * Delete an attachment file
     */
    public function deleteFile(KajianFile $file): bool
    {
        if (Storage::disk('s3')->exists($file->file_path)) {
            Storage::disk('s3')->delete($file->file_path);
        }
        return $file->delete();
    }

    /**
     * Upload an image to the Kajian gallery
     */
    public function uploadGallery(Kajian $kajian, UploadedFile $file, ?string $caption = null): KajianGallery
    {
        $folder = 'kajian/' . $kajian->uuid . '/gallery';
        $path = $file->store($folder, 's3');

        $maxOrder = $kajian->galleries()->max('sort_order') ?? 0;

        return KajianGallery::create([
            'kajian_id' => $kajian->id,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'caption' => $caption,
            'sort_order' => $maxOrder + 1,
        ]);
    }

    /**
     * Reorder gallery images
     */
    public function reorderGallery(array $items): void
    {
        foreach ($items as $index => $id) {
            KajianGallery::where('id', $id)->update(['sort_order' => $index + 1]);
        }
    }

    /**
     * Save a snapshot version of a Kajian before modifying it
     */
    public function createVersionSnapshot(Kajian $kajian, array $changesSummary = []): KajianVersion
    {
        $snapshotData = [
            'judul' => $kajian->judul,
            'ringkasan' => $kajian->ringkasan,
            'tujuan' => $kajian->tujuan,
            'latar_belakang' => $kajian->latar_belakang,
            'metodologi' => $kajian->metodologi,
            'lokasi' => $kajian->lokasi,
            'tanggal' => $kajian->tanggal?->format('Y-m-d'),
            'penanggung_jawab' => $kajian->penanggung_jawab,
            'koordinator' => $kajian->koordinator,
            'tim' => $kajian->tim,
            'mitra' => $kajian->mitra,
            'temuan' => $kajian->temuan,
            'rekomendasi' => $kajian->rekomendasi,
            'implikasi' => $kajian->implikasi,
        ];

        // Backup existing PDF file path if present
        $pdf = $kajian->pdf_file;
        $snapshotPath = $pdf ? $pdf->file_path : null;

        $newVersion = KajianVersion::create([
            'kajian_id' => $kajian->id,
            'version_number' => $kajian->version,
            'changes_summary' => $changesSummary ?: ['description' => 'Update data kajian'],
            'file_path' => $snapshotPath,
            'created_by' => auth()->id() ?? $kajian->created_by,
        ]);

        // Increment version counter on the main Kajian
        $kajian->increment('version');

        return $newVersion;
    }

    /**
     * Publish workflow
     */
    public function publish(Kajian $kajian): bool
    {
        return $kajian->update([
            'status' => 'published',
            'published_at' => now(),
        ]);
    }

    /**
     * Archive workflow
     */
    public function archive(Kajian $kajian): bool
    {
        return $kajian->update([
            'status' => 'archived',
            'archived_at' => now(),
        ]);
    }

    /**
     * Revert to draft workflow
     */
    public function toDraft(Kajian $kajian): bool
    {
        return $kajian->update([
            'status' => 'draft',
        ]);
    }
}
