<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Category;

class ViewPageController extends Controller
{
    //

    public function index($slug){
        $categories = Category::where('active', 1)->get();


        $article = Article::with('category','author')
            ->where('slug', $slug)
            ->where('status', 'PUBLIC')
            ->first();
            
            //return $content;

        return Inertia::render('View',[
            'article' => $article,
            'categories' => $categories
        ]);
    }
}
