<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Bidang extends Model
{
    use SoftDeletes;

    protected $table = 'bidangs';

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
        return $this->hasMany(Kajian::class, 'bidang_id');
    }
}
