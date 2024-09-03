<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Auth;
use Inertia\Response;
use Inertia\Inertia;


class UserCommentController extends Controller
{
    //


    public function getCommentByArticle($id){
        return Comment::with(['user'])
            ->where('article_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $req){

        $req->validate([
            'article_id' => ['required'],
            'comment' => ['required',' string', 'max:1000'],
        ]);

        $user = Auth::user();

        Comment::create([
            'article_id' => $req->article_id,
            'user_id' => $user->user_id,
            'comment' => $req->comment,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }

}
