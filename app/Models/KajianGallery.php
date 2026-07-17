<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class KajianGallery extends Model
{
    use SoftDeletes;

    protected $table = 'kajian_galleries';

    protected $fillable = [
        'uuid',
        'kajian_id',
        'file_path',
        'file_name',
        'caption',
        'sort_order',
    ];

    protected $appends = ['file_url'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    public function getFileUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }

    public function kajian()
    {
        return $this->belongsTo(Kajian::class, 'kajian_id');
    }
}
