<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->char('uid', 36)->nullable();
            $table->string('photo', 2048)->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('phone')->nullable();
            $table->string('last_login')->nullable();
            $table->rememberToken();
            $table->string('last_ip_address')->nullable();
            $table->string('nickname')->nullable();
            $table->string('address')->nullable();
            $table->string('jenis')->nullable();
            $table->string('unit_id')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('kelurahan_id')->nullable();
            $table->string('level')->nullable();
            $table->bigInteger('id_opd')->unsigned()->nullable();
            $table->string('gender')->nullable();
            $table->date('date_birth')->nullable();
            $table->text('device_token')->nullable();
            $table->text('token_sso')->nullable();
            $table->string('type_id')->nullable();
            $table->string('number_id')->nullable();
            $table->boolean('dark_mode')->default(false);
            $table->text('photo_url')->nullable();
            $table->datetime('last_login_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('slug', 50)->unique();
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('slug', 50)->unique();
            $table->string('http_method')->nullable();
            $table->text('http_path')->nullable();
            $table->timestamps();
        });

        Schema::create('role_users', function (Blueprint $table) {
            $table->integer('role_id');
            $table->integer('user_id');
            $table->timestamps();
            $table->index(['role_id', 'user_id']);
        });

        Schema::create('role_permissions', function (Blueprint $table) {
            $table->integer('role_id');
            $table->integer('permission_id');
            $table->timestamps();
            $table->index(['role_id', 'permission_id']);
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('role_users');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('users');
    }
};
