<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Permission extends Model
{
    use Auditable;

    protected $table = 'permissions';

    protected $fillable = [
        'name',
        'slug',
        'http_method',
        'http_path',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions', 'permission_id', 'role_id');
    }
}
