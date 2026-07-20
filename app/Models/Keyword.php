<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Traits\Auditable;

class Keyword extends Model
{
    use SoftDeletes, Auditable;

    protected $table = 'keywords';

    protected $fillable = [
        'nama',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->nama);
            }
        });
    }

    public function kajians()
    {
        return $this->belongsToMany(Kajian::class, 'kajian_keywords', 'keyword_id', 'kajian_id');
    }
}
