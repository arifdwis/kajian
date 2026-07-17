<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Kajian extends Model
{
    use SoftDeletes;

    protected $table = 'kajians';

    protected $fillable = [
        'uuid',
        'judul',
        'slug',
        'tahun_id',
        'bidang_id',
        'jenis_id',
        'ringkasan',
        'tujuan',
        'latar_belakang',
        'metodologi',
        'lokasi',
        'tanggal',
        'penanggung_jawab',
        'koordinator',
        'tim',
        'mitra',
        'temuan',
        'rekomendasi',
        'implikasi',
        'status',
        'view_count',
        'download_count',
        'version',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'published_at',
        'archived_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'tim' => 'array',
        'tanggal' => 'date',
        'published_at' => 'datetime',
        'archived_at' => 'datetime',
        'view_count' => 'integer',
        'download_count' => 'integer',
        'version' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->judul) . '-' . rand(1000, 9999);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function bidang()
    {
        return $this->belongsTo(Bidang::class, 'bidang_id');
    }

    public function jenisKajian()
    {
        return $this->belongsTo(JenisKajian::class, 'jenis_id');
    }

    public function tahun()
    {
        return $this->belongsTo(Tahun::class, 'tahun_id');
    }

    public function keywords()
    {
        return $this->belongsToMany(Keyword::class, 'kajian_keywords', 'kajian_id', 'keyword_id');
    }

    public function files()
    {
        return $this->hasMany(KajianFile::class, 'kajian_id');
    }

    public function galleries()
    {
        return $this->hasMany(KajianGallery::class, 'kajian_id')->orderBy('sort_order');
    }

    public function versions()
    {
        return $this->hasMany(KajianVersion::class, 'kajian_id')->orderBy('version_number', 'desc');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function getCoverFileAttribute()
    {
        return $this->files()->where('tipe', 'cover')->first();
    }

    public function getPdfFileAttribute()
    {
        return $this->files()->where('tipe', 'pdf')->first();
    }

    public function getPresentasiFileAttribute()
    {
        return $this->files()->where('tipe', 'presentasi')->first();
    }
}
