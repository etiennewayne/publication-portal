<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;



    protected $primaryKey = 'comment_id';
    protected $table = 'comments';

    protected $fillable = [
        'article_id',
        'user_id',
        'comment',
        'like',
        'unlike',
        'happy',
        'sad',
        'care',
        'angry'
    ];


    public function article(){
        return $this->belongsTo(Article::class, 'category_id', 'category_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

}
