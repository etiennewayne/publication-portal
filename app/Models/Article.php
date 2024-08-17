<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $primaryKey = 'article_id';

    protected $fillable = [
        'title',
        'article_content',
        'category_id',
        'author',
        'encoded_by',
        'modified_by',
        'featured_image', //upload on frontend
        'featured_image_caption',
        'date_published',
        'is_published',
        'is_featured',
        'status',
        'views'
    ];


    public function encoded(){
        return $this->hasOne(User::class,'user_id', 'encoded_by');
    }

    public function category(){
        return $this->hasOne(Category::class,'category_id', 'category_id');
    }

}
