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
        'author',
        'encoded_by',
        'modified_by',
        'featured_image',
        'date_published',
        'is_published',
        'is_featured',
        'views'
    ];

}
