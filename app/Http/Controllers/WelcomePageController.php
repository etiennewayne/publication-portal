<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;

class WelcomePageController extends Controller
{
    //

    public function index(){
        $categories = Category::where('active', 1)
            ->take(10)
            ->get();
    
        return Inertia::render('WelcomePage',[
            'categories' => $categories
        ]);
    }
}
