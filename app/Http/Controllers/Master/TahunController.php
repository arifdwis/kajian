<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Tahun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TahunController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('master.tahun.index');

        $query = Tahun::query();

        if ($request->has('search') && $request->search) {
            $query->where('tahun', 'like', "%{$request->search}%");
        }

        $tahuns = $query->orderBy('tahun', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Master/Tahun/Index', [
            'tahuns' => $tahuns,
            'filters' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('master.tahun.create');

        $data = $request->validate([
            'tahun' => 'required|integer|min:1900|max:2100|unique:tahuns,tahun',
        ]);

        Tahun::create($data);

        return redirect()->back()->with('success', 'Tahun referensi berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('master.tahun.edit');

        $tahun = Tahun::findOrFail($id);

        $data = $request->validate([
            'tahun' => 'required|integer|min:1900|max:2100|unique:tahuns,tahun,' . $id,
        ]);

        $tahun->update($data);

        return redirect()->back()->with('success', 'Tahun referensi berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('master.tahun.destroy');

        $tahun = Tahun::findOrFail($id);

        if ($tahun->kajians()->exists()) {
            return redirect()->back()->with('error', 'Tahun ini tidak dapat dihapus karena masih digunakan pada data kajian.');
        }

        $tahun->delete();

        return redirect()->back()->with('success', 'Tahun referensi berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
