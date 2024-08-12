<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

use App\Utilities\AhoCorasick; // Import the AhoCorasick class

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
    public function store(Request $req)
    {
        //
        $req->validate([
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'content' => ['required'],
        ]);

        // Build the Trie
        // $badWords = Word::pluck('name')->toArray();//todo might change to word insted of name
        // $ahoCorasick = new AhoCorasick();
        // foreach ($badWords as $badWord) {
        //     $ahoCorasick->insert(strtolower($badWord));
        // }
        // $ahoCorasick->buildFailureLinks();

        // // Check if the article title contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['title']))) {
        //     return redirect()->back()->withErrors(['title' => 'The title contains inappropriate content.']);
        // }

        // // Check if the article body contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['body']))) {
        //     return redirect()->back()->withErrors(['body' => 'The body contains inappropriate content.']);
        // }

        // // Check if the article body contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['caption']))) {
        //     return redirect()->back()->withErrors(['caption' => 'The caption contains inappropriate content.']);
        // }

        return $req;

        //parseFunction
        //Article::create();
    }


    function imageParser($content){
        //HTMLDom /storage/article_images
        //parse the content
        //<base 0
        //base64 1
        //base64 2

        //file_put_content()

        //store()

        //return filename
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
