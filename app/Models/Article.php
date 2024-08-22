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
        'excerpt',
        'slug',
        'article_content',
        'category_id',
        'author',
        'author_id',
        'encoded_by',
        'modified_by',
        'featured_image', //upload on frontend
        'featured_image_caption',
        'date_published',
        'status',
        'is_featured',
        'views'
    ];


    public function encoded(){
        return $this->hasOne(User::class,'user_id', 'encoded_by');
    }

    public function author(){
        return $this->hasOne(User::class,'user_id', 'author_id');
    }

    public function category(){
        return $this->hasOne(Category::class,'category_id', 'category_id');
    }

    public function academic_year(){
        return $this->hasOne(AcademicYear::class,'academic_year_id', 'academic_year_id');
    }
}
