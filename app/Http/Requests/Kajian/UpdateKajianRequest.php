<?php

namespace App\Http\Requests\Kajian;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKajianRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Operator can only update their own bidang
        $kajian = $this->route('kajian');
        if ($this->user()->hasRole('operator')) {
            return $this->user()->hasPermission('kajian.edit') && $this->user()->id_opd === $kajian->bidang_id;
        }

        return $this->user()->hasPermission('kajian.edit');
    }

    public function rules(): array
    {
        return [
            'judul' => 'required|string|max:500',
            'tahun_id' => 'required|exists:tahuns,id',
            'bidang_id' => 'required|exists:bidangs,id',
            'jenis_id' => 'required|exists:jenis_kajians,id',
            'ringkasan' => 'nullable|string',
            'tujuan' => 'nullable|string',
            'latar_belakang' => 'nullable|string',
            'metodologi' => 'nullable|string',
            'lokasi' => 'nullable|string|max:255',
            'tanggal' => 'nullable|date',
            'penanggung_jawab' => 'nullable|string|max:255',
            'koordinator' => 'nullable|string|max:255',
            'tim' => 'nullable|array',
            'mitra' => 'nullable|string|max:255',
            'temuan' => 'nullable|string',
            'rekomendasi' => 'nullable|string',
            'implikasi' => 'nullable|string',
            'status' => 'nullable|in:draft,review,published,archived',
            'keywords' => 'nullable|array',
            'keywords.*' => 'exists:keywords,id',
            
            // Upload files validation
            'file_pdf' => 'nullable|file|mimes:pdf|max:20480',
            'file_presentasi' => 'nullable|file|mimes:pdf,ppt,pptx|max:20480',
            'file_cover' => 'nullable|file|image|mimes:jpeg,png,jpg|max:5120',
            
            // Version control diff summary
            'changes_summary' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'file_pdf.mimes' => 'Lampiran Dokumen Utama harus berformat PDF.',
            'file_pdf.max' => 'Ukuran Dokumen Utama tidak boleh lebih dari 20MB.',
            'file_presentasi.mimes' => 'Lampiran Presentasi harus berformat PDF atau PPT/PPTX.',
            'file_presentasi.max' => 'Ukuran Presentasi tidak boleh lebih dari 20MB.',
            'file_cover.image' => 'Cover harus berupa gambar.',
            'file_cover.max' => 'Ukuran Cover tidak boleh lebih dari 5MB.',
        ];
    }
}
