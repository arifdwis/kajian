<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KataKunciController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('master.kata_kunci.index');

        $query = Keyword::query();

        if ($request->has('search') && $request->search) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        $keywords = $query->orderBy('nama')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Master/KataKunci/Index', [
            'keywords' => $keywords,
            'filters' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('master.kata_kunci.create');

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:keywords,nama',
        ]);

        $data['slug'] = Str::slug($data['nama']);

        Keyword::create($data);

        return redirect()->back()->with('success', 'Kata kunci berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('master.kata_kunci.edit');

        $keyword = Keyword::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:keywords,nama,' . $id,
        ]);

        $data['slug'] = Str::slug($data['nama']);

        $keyword->update($data);

        return redirect()->back()->with('success', 'Kata kunci berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('master.kata_kunci.destroy');

        $keyword = Keyword::findOrFail($id);

        if ($keyword->kajians()->exists()) {
            return redirect()->back()->with('error', 'Kata kunci ini tidak dapat dihapus karena masih digunakan pada data kajian.');
        }

        $keyword->delete();

        return redirect()->back()->with('success', 'Kata kunci berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
