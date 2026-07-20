<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Auditable;

class KajianVersion extends Model
{
    use Auditable;
    protected $table = 'kajian_versions';

    protected $fillable = [
        'uuid',
        'kajian_id',
        'version_number',
        'changes_summary',
        'file_path',
        'created_by',
    ];

    protected $casts = [
        'changes_summary' => 'array',
        'version_number' => 'integer',
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

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }

    public function kajian()
    {
        return $this->belongsTo(Kajian::class, 'kajian_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
