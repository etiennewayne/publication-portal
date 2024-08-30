<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\AcademicYear;

class CategoryPageController extends Controller
{
    //

    public function index(){
        //$ay = AcademicYear::where('active', 1)->first();

        // $categoryArticles = Category::with(['articles' => function($q) use ($ay) {
        //         $q->where('academic_year_id', $ay->academic_year_id); //this will display all categories but not have articles
        //     }])
        //     ->whereHas('articles', function($q) use ($ay){
        //         $q->where('academic_year_id', $ay->academic_year_id); //this will prevent to display articles with no category
        //     })
        //     ->orderBy('category', 'asc')
        //     ->get();

        $categoryArticles = Category::with(['articles'])
            ->whereHas('articles', function($q) {
                $q->orderBy('views', 'desc'); //this will prevent to display articles with no category
            })
            ->orderBy('category', 'asc')
            ->get();


        return Inertia::render('CategoryPage',[
            'categoryArticles' => $categoryArticles
        ]);
    }
}
