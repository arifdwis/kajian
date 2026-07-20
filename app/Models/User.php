<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Traits\Auditable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, Auditable;

    protected $fillable = [
        'uid',
        'photo',
        'name',
        'email',
        'email_verified_at',
        'password',
        'phone',
        'last_login',
        'last_ip_address',
        'nickname',
        'address',
        'jenis',
        'unit_id',
        'postal_code',
        'kelurahan_id',
        'level',
        'id_opd',
        'institution_name',
        'gender',
        'date_birth',
        'device_token',
        'token_sso',
        'type_id',
        'number_id',
        'dark_mode',
        'photo_url',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['photo_url_path'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'date_birth' => 'date',
            'password' => 'hashed',
            'dark_mode' => 'boolean',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uid)) {
                $model->uid = (string) Str::uuid();
            }
        });
    }

    public function getPhotoUrlPathAttribute(): string
    {
        if ($this->photo) {
            return asset('storage/' . $this->photo);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF';
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_users', 'user_id', 'role_id');
    }

    public function notifikasis()
    {
        return $this->hasMany(Notifikasi::class, 'id_user');
    }

    public function hasRole($role): bool
    {
        if (is_string($role)) {
            return $this->roles()->where('slug', $role)->exists();
        }

        if (is_array($role)) {
            return $this->roles()->whereIn('slug', $role)->exists();
        }

        return false;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(['superadmin', 'admin']);
    }

    public function getRoleNameAttribute(): string
    {
        $role = $this->roles()->first();
        return $role ? $role->name : 'Guest';
    }

    public function assignRole($roleSlug): void
    {
        $role = Role::where('slug', $roleSlug)->first();
        if ($role && !$this->roles()->where('role_id', $role->id)->exists()) {
            $this->roles()->attach($role->id);
        }
    }

    public function hasPermission($permission): bool
    {
        // Superadmin bypass
        if ($this->hasRole('superadmin')) {
            return true;
        }

        return $this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('slug', Str::slug($permission))
                  ->orWhere('name', $permission);
        })->exists();
    }
}
