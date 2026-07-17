<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tahun extends Model
{
    protected $table = 'tahuns';

    protected $fillable = [
        'tahun',
    ];

    public function kajians()
    {
        return $this->hasMany(Kajian::class, 'tahun_id');
    }
}
