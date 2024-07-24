<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;


class AdminArticleController extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/Article/ArticleIndex');
    }


    public function create(){
        return Inertia::render('Admin/Article/ArticleCreateEdit');
    }

}
