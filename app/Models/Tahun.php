<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Tahun extends Model
{
    use Auditable;

    protected $table = 'tahuns';

    protected $fillable = [
        'tahun',
    ];

    public function kajians()
    {
        return $this->hasMany(Kajian::class, 'tahun_id');
    }
}
