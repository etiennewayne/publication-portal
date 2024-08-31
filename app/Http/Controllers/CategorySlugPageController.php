<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Article;
use Inertia\Response;
use Inertia\Inertia;

class CategorySlugPageController extends Controller
{
    //
    public function index($slug){
        $categories = Category::where('active', 1)->get();
        $category = Category::where('slug', $slug)->first();

        return Inertia::render('CategorySlugPage',[
            'categories' => $categories,
            'slug' => $slug,
            'propCategory' => $category
        ]);
    }


    public function getArticlesByCategory(Request $req){
        //return $req->search;
        
        $category = Article::with('category')
            ->whereHas('category', function($q) use($req){
                $q->where('slug', $req->slug);
            })
            ->where('title', 'like', '%' . $req->search . '%')
            ->orderBy('date_published', 'desc')
            ->get();

        return $category;
    }
}
