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
        Schema::create('kajians', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->string('judul', 500);
            $table->string('slug', 500)->unique();
            $table->foreignId('tahun_id')->constrained('tahuns');
            $table->foreignId('bidang_id')->constrained('bidangs');
            $table->foreignId('jenis_id')->constrained('jenis_kajians');
            $table->text('ringkasan')->nullable();
            $table->text('tujuan')->nullable();
            $table->text('latar_belakang')->nullable();
            $table->text('metodologi')->nullable();
            $table->string('lokasi')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('penanggung_jawab')->nullable();
            $table->string('koordinator')->nullable();
            $table->json('tim')->nullable();
            $table->string('mitra')->nullable();
            $table->text('temuan')->nullable();
            $table->text('rekomendasi')->nullable();
            $table->text('implikasi')->nullable();
            $table->enum('status', ['draft', 'review', 'published', 'archived'])->default('draft');
            $table->integer('view_count')->default(0);
            $table->integer('download_count')->default(0);
            $table->integer('version')->default(1);
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_keywords')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();

            // Fulltext index
            if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
                $table->fullText(['judul', 'ringkasan', 'temuan', 'rekomendasi']);
            }
        });

        Schema::create('kajian_files', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->foreignId('kajian_id')->constrained('kajians')->onDelete('cascade');
            $table->enum('tipe', ['pdf', 'presentasi', 'cover']);
            $table->string('file_path');
            $table->string('file_name');
            $table->bigInteger('file_size');
            $table->string('mime_type');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('kajian_galleries', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->foreignId('kajian_id')->constrained('kajians')->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name');
            $table->string('caption')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('kajian_versions', function (Blueprint $table) {
            $table->id();
            $table->char('uuid', 36)->unique();
            $table->foreignId('kajian_id')->constrained('kajians')->onDelete('cascade');
            $table->integer('version_number');
            $table->json('changes_summary')->nullable();
            $table->string('file_path')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('kajian_keywords', function (Blueprint $table) {
            $table->foreignId('kajian_id')->constrained('kajians')->onDelete('cascade');
            $table->foreignId('keyword_id')->constrained('keywords')->onDelete('cascade');
            $table->primary(['kajian_id', 'keyword_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kajian_keywords');
        Schema::dropIfExists('kajian_versions');
        Schema::dropIfExists('kajian_galleries');
        Schema::dropIfExists('kajian_files');
        Schema::dropIfExists('kajians');
    }
};
