<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Article;

class ViewController extends Controller
{
    //

    public function index($slug){
        $article = Article::with('category')
            ->where('slug', $slug)
            ->where('status', 'PUBLIC')
            ->first();
            
            //return $content;

        return Inertia::render('View',[
            'article' => $article
        ]);
    }
}
