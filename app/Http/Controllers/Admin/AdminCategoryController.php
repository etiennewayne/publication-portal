<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;


class AdminCategoryController extends Controller
{
    //

    public function index(){
        return Inertia::render('Admin/Category/CategoryIndex');
    }

    public function getData(Request $req){
        return Category::where('category', 'like', $req->search . '%')
            ->paginate($req->perpage);
    }

    public function show($id){
        return Category::find($id);
    }


    public function store(Request $req){
        
        $req->validate([
            'category' => ['required','string', 'unique:categories']
        ]);

        Category::create([
            'category' => strtoupper($req->category),
            'slug' => Str::slug($req->category),
            'active' => $req->active ? 1 : 0
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }


    public function update(Request $req, $id){

        $req->validate([
            'category' => ['required','unique:categories,category,'.$id.',category_id']
        ]);

        $data = Category::find($id);
        $data->category = strtoupper($req->category);
        $data->slug = Str::slug($req->category);
        $data->active = $req->active ? 1 : 0;
        $data->save();


        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        Category::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }


}
