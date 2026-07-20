<?php

namespace App\Traits;

use App\Models\AuditLog;

trait Auditable
{
    public static function bootAuditable(): void
    {
        static::created(function ($model) {
            $attrs = $model->getAttributes();
            $hidden = ['password', 'remember_token'];
            foreach ($hidden as $key) {
                if (isset($attrs[$key])) {
                    $attrs[$key] = '***';
                }
            }
            self::log($model, 'create', null, $attrs);
        });

        static::updated(function ($model) {
            $dirty = $model->getDirty();
            $original = [];
            $hidden = ['password', 'remember_token'];

            foreach ($dirty as $key => $newVal) {
                if (in_array($key, $hidden)) {
                    $original[$key] = '***';
                    $dirty[$key] = '***';
                } else {
                    $original[$key] = $model->getOriginal($key);
                }
            }

            self::log($model, 'update', $original, $dirty);
        });

        static::deleted(function ($model) {
            $attrs = $model->getAttributes();
            $hidden = ['password', 'remember_token'];
            foreach ($hidden as $key) {
                if (isset($attrs[$key])) {
                    $attrs[$key] = '***';
                }
            }
            self::log($model, 'delete', $attrs, null);
        });
    }

    protected static function log($model, string $action, ?array $old, ?array $new): void
    {
        AuditLog::create([
            'user_id' => auth()->check() ? auth()->id() : null,
            'action' => $action,
            'model_type' => get_class($model),
            'model_id' => $model->getKey(),
            'old_values' => $old,
            'new_values' => $new,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
