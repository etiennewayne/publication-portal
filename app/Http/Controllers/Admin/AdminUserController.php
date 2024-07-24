<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    //

    public function index(){
        return Inertia::render('Admin/User/UserIndex');
    }

    public function getData(Request $req){

    }


    public function create(){ 
        
    }
}
