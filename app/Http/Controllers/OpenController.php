<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class OpenController extends Controller
{
    //

    public function loadCategories(Request $req){
        return Category::orderBy('category', 'asc')
            ->get();
    }
}
