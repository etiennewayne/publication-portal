<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;

class FreedomWallPageController extends Controller
{
    //

    public function index(){
        $categories = Category::where('active', 1)->get();

        return Inertia::render('FreedomWallPage', [
            'categories' => $categories
        ]);
    }
}
