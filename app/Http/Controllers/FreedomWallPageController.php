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

        return Inertia::render('FreedomWallPage');
    }
}
