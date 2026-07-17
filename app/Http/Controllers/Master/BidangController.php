<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BidangController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('master.bidang.index');

        $query = Bidang::query();

        if ($request->has('search') && $request->search) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        $bidangs = $query->orderBy('nama')->paginate(10)->withQueryString();

        return Inertia::render('Backend/Master/Bidang/Index', [
            'bidangs' => $bidangs,
            'filters' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('master.bidang.create');

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:bidangs,nama',
        ]);

        $data['slug'] = Str::slug($data['nama']);

        Bidang::create($data);

        return redirect()->back()->with('success', 'Bidang kajian berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $this->authorizePermission('master.bidang.edit');

        $bidang = Bidang::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required|string|max:255|unique:bidangs,nama,' . $id,
        ]);

        $data['slug'] = Str::slug($data['nama']);

        $bidang->update($data);

        return redirect()->back()->with('success', 'Bidang kajian berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $this->authorizePermission('master.bidang.destroy');

        $bidang = Bidang::findOrFail($id);
        
        if ($bidang->kajians()->exists()) {
            return redirect()->back()->with('error', 'Bidang ini tidak dapat dihapus karena masih digunakan pada data kajian.');
        }

        $bidang->delete();

        return redirect()->back()->with('success', 'Bidang kajian berhasil dihapus.');
    }

    protected function authorizePermission(string $permission)
    {
        if (auth()->check() && !auth()->user()->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
