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
        $content = Article::where('slug', $slug)
            ->where('status', 'PUBLIC')
            ->first();
            
            //return $content;

        return Inertia::render('View',[
            'content' => $content
        ]);
    }
}
