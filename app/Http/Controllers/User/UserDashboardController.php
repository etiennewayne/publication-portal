<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('User/UserDashboard');
    }
}
