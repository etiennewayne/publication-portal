<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

use App\Models\AcademicYear;

class AdminAcademicYearController extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/AcademicYear/AcademicYearIndex');
    }

    public function getData(Request $req){
        return AcademicYear::where('academic_year_description', 'like', $req->search . '%')
            ->paginate($req->perpage);
    }

    public function show($id){
        return AcademicYear::find($id);
    }


    public function store(Request $req){

        $req->validate([
            'academic_year_code' => ['required','string', 'unique:academic_years'],
            'academic_year_description' => ['required','string']
        ]);

        AcademicYear::create([
            'academic_year_code' => strtoupper($req->academic_year_code),
            'academic_year_description' => strtoupper($req->academic_year_description),
            'active' => $req->active ? 1 : 0
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }


    public function update(Request $req, $id){

        $req->validate([
            'academic_year_code' => ['required','string', 'unique:academic_years,academic_year_code,' . $id . ',academic_year_id'],
            'academic_year_description' => ['required','string']
        ]);

        $data = AcademicYear::find($id);
        $data->academic_year_code = strtoupper($req->academic_year_code);
        $data->academic_year_description = strtoupper($req->academic_year_description);
        $data->active = $req->active ? 1 : 0;
        $data->save();


        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id){
        AcademicYear::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
