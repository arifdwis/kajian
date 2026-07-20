<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Auditable;

class Menu extends Model
{
    use HasFactory, SoftDeletes, Auditable;

    protected $fillable = [
        'parent_id',
        'title',
        'route',
        'icon',
        'permission_name',
        'is_active',
        'order',
        'roles',
    ];

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('order');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
}
