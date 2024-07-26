<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    //

    public function index(){
        return Inertia::render('Admin/Category/CategoryIndex');
    }


}
