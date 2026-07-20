<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Opd extends Model
{
    use Auditable;

    protected $fillable = ['nama', 'singkatan'];
}
