<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Response;
use Inertia\Inertia;

class CategorySlugPageController extends Controller
{
    //
    public function index($slug){
        $categories = Category::where('active', 1)->get();


        $categoryArticles = Category::with(['articles'])
            ->whereHas('articles', function($q) {
                $q->orderBy('views', 'desc'); //this will prevent to display articles with no category
            })
            ->where('slug', $slug)
            ->orderBy('category', 'asc')
            ->get();

        return Inertia::render('CategorySlugPage',[
            'categoryArticles' => $categoryArticles,
            'categories' => $categories
        ]);

    }
}
