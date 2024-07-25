<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserController extends Controller
{
    //

    public function index(){
        return Inertia::render('Admin/User/UserIndex');
    }

    public function getData(Request $req){

        return User::where('username', 'like', $req->name . '%')
            ->where('name', 'like', $req->name . '%')
            ->paginate($req->perpage);

    }

    public function show($id){
        return User::find($id);
    }


    public function store(Request $req){ 
        $req->validate([
            'username' => ['required', 'string', 'unique:users'],
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'string', 'confirmed'],
            'sex' => ['required', 'string'],
            'role' => ['required', 'string'],
        ]);

        User::create([
            'username' => $req->username,
            'password' => Hash::make($req->password),
            'name' => $req->name,
            'email' => $req->email,
            'sex' => strtoupper($req->sex),
            'role' => $req->role,
            'active' => $req->active ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

    public function update(Request $req, $id){ 
        return $req;
        $req->validate([
            'username' => ['required', 'string', 'unique:users,username,'. $id . ',user_id'],
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,'. $id . ',user_id'],
            'sex' => ['required', 'string'],
            'role' => ['required', 'string'],
        ]);

        User::where('user_id', $id)
            ->update([
                'username' => $req->username,
                'name' => $req->name,
                'email' => $req->email,
                'sex' => strtoupper($req->sex),
                'role' => $req->role,
                'active' => $req->active ? 1 : 0,
            ]);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        User::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
