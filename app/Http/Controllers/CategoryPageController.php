<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\ModelName;

class CategoryPageController extends Controller
{
    //

    public function index(){
        $catergoryArticles = Category::with('articles')
            ->get();

        return Inertia::render('CategoryPage',[
            'catergoryArticles' => $catergoryArticles
        ]);
    }
}
