<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class KajianKeyword extends Pivot
{
    protected $table = 'kajian_keywords';

    protected $fillable = [
        'kajian_id',
        'keyword_id',
    ];
}
