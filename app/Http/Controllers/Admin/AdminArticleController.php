<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Article/ArticleIndex');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Article/ArticleCreateEdit', [
            'id' => 0
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
        return Article::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id){
        return Inertia::render('Admin/Article/AricleCreateEdit',[
            'id' =>  $id
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }

    public function getData(Request $req){

        return Article::where('title', 'like', $req->search . '%')
            ->where('article_content', 'like', $req->search . '%')
            ->paginate($req->perpage);
    }
}
