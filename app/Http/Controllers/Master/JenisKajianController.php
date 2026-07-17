<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\JenisKajian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class JenisKajianController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('master.jenis_kajian.index');

        $query = JenisKajian::query();

        if ($request->has('search') && $request->search) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        $jenisKajians = $query->orderBy('nama')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Master/JenisKajian/Index', [
            'jenisKajians' => $jenisKajians,
            'filters' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('master.jenis_kajian.create');

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:jenis_kajians,nama',
        ]);

        $data['slug'] = Str::slug($data['nama']);

        JenisKajian::create($data);

        return redirect()->back()->with('success', 'Jenis kajian berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('master.jenis_kajian.edit');

        $jenis = JenisKajian::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:jenis_kajians,nama,' . $id,
        ]);

        $data['slug'] = Str::slug($data['nama']);

        $jenis->update($data);

        return redirect()->back()->with('success', 'Jenis kajian berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('master.jenis_kajian.destroy');

        $jenis = JenisKajian::findOrFail($id);

        if ($jenis->kajians()->exists()) {
            return redirect()->back()->with('error', 'Jenis kajian ini tidak dapat dihapus karena masih digunakan pada data kajian.');
        }

        $jenis->delete();

        return redirect()->back()->with('success', 'Jenis kajian berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
