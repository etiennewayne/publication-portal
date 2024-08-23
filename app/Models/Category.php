<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';
    protected $table = 'categories';

    protected $fillable = [
        'category',
        'active'
    ];


    public function articles(){
        $this->hasMany(Articles::class, 'category_id', 'category_id');
    }

}
