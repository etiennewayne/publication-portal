<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;


class AdminCategoryController extends Controller
{
    //

    public function index(){
        return Inertia::render('Admin/Category/CategoryIndex');
    }

    public function getData(Request $req){
        return Category::where('category', 'like', $req->cat . '%')
            ->paginate($req->perpage);
    }


    public function store(Request $req){
        
        $req->validate([
            'category' => ['required','string', 'unique:categories']
        ]);

        Category::create([
            'category' => strtoupper($req->category),
            'active' => $req->active
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }


    public function update(Request $req, $id){
        $req->validate([
            'category' => ['required','string', 'unique:categories,category,' . $id . ',category_id']
        ]);

        $data = Category::find($id);
        $data->category = strtoupper($req->category);
        $data->active = $req->active;
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
