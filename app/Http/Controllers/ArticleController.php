<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    //

    public function loadFeaturedArtice(){
        return Article::with('author')
            ->where('is_featured', 1)
            ->where('status', 'PUBLIC')
            ->orderBy('date_published', 'desc')
            ->first();
    }

    public function loadSideArticles(){
        return Article::with('author', 'category')
            ->orderBy('views', 'desc')
            ->where('status', 'PUBLIC')
            ->get()
            ->take(2); 
    }

    public function loadaLatestArtcles(Request $req){
        return Article::with('author', 'category')
            ->orderBy('date_published', 'desc')
            ->where('status', 'PUBLIC')
            ->get()
            ->take(9); 
    }

    public function incrementView($id){
        $data = Article::find($id);
        $data->increment('views');
        $data->save();
    }


}
