<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Auth;
use App\Models\Status;
use App\Models\User;

use App\Utilities\AhoCorasick; // Import the AhoCorasick class

class AdminArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
       

        return Inertia::render('Admin/Article/ArticleIndex');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $statuses = Status::orderBy('status', 'asc')->get();
        $users = User::orderBy('lname', 'asc')->get();
        return Inertia::render('Admin/Article/ArticleCreateEdit', [
            'id' => 0,
            'statuses' => $statuses,
            'users' => $users
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    { 
        //
        $req->validate([
            'title' => ['required', 'string', 'unique:articles'],
            'author' => ['required'],
            'article_content' => ['required'],
            'category' => ['required'],
            'status' => ['required'],
            'date_published' => ['required'],
            'upload' => ['required'],
            'featured_image_caption' => ['required']
        ]);

        if($req->has('upload')){
            if(!isset($req->upload[0]) && $req->upload[0]['response' == '']){

                return response()->json([
                    'errors' => [
                        'upload' => ['Please upload featured image.'],
                        'message' => 'Empty field.'
                    ]
                ], 422);
            }
        }

      
        $user = Auth::user();
        $imgFilename = $req->upload[0]['response'];
        $datePublished = date('Y-m-d', strtotime($req->date_published));

        Article::create([
            'title' => ucfirst($req->title),
            'article_content' => $req->article_content,
            'category_id' => $req->category,
            'author_id' => $req->author,
            'encoded_by' => $user->user_id,
            'featured_image' => $imgFilename,
            'featured_image_caption' => $req->featured_image_caption,
            'date_published' => $datePublished,
            'status' => $req->status,
            'is_featured' => $req->is_featured ? 1 : 0
        ]);

        if (Storage::exists('public/temp/' . $imgFilename)) {
            // Move the file
            Storage::move('public/temp/' . $imgFilename, 'public/featured_images/' . $imgFilename); 
            Storage::delete('public/temp/' . $imgFilename);
        }

        return response()->json([
            'status' => 'saved'
        ], 200);

        // Build the Trie
        // $badWords = Word::pluck('name')->toArray();//todo might change to word insted of name
        // $ahoCorasick = new AhoCorasick();
        // foreach ($badWords as $badWord) {
        //     $ahoCorasick->insert(strtolower($badWord));
        // }
        // $ahoCorasick->buildFailureLinks();

        // // Check if the article title contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['title']))) {
        //     return redirect()->back()->withErrors(['title' => 'The title contains inappropriate content.']);
        // }

        // // Check if the article body contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['body']))) {
        //     return redirect()->back()->withErrors(['body' => 'The body contains inappropriate content.']);
        // }

        // // Check if the article body contains any bad words using Aho-Corasick
        // if ($ahoCorasick->search(strtolower($data['caption']))) {
        //     return redirect()->back()->withErrors(['caption' => 'The caption contains inappropriate content.']);
        // }

        return $req;

        //parseFunction
        //Article::create();
    }


    function imageParser($content){
        //HTMLDom /storage/article_images
        //parse the content
        //<base 0
        //base64 1
        //base64 2

        //file_put_content()

        //store()

        //return filename
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        return Article::find($id);
        // comment jessel zapanta gwapo edit 1
        //balos ko gwapo sad ko
        //akoa ning update eshen
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id){
        $statuses = Status::orderBy('status', 'asc')->get();
        $article = Article::find($id);
        $users = User::orderBy('lname', 'asc')->get();
         
        return Inertia::render('Admin/Article/ArticleCreateEdit', [
            'id' =>  $id,
            'statuses' => $statuses,
            'article' => $article,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, $id)
    {
        $req->validate([
            'title' => ['required', 'string', 'unique:articles,title,' . $id . ',article_id'],
            'author' => ['required'],
            'article_content' => ['required'],
            'category' => ['required'],
            'status' => ['required'],
            'date_published' => ['required'],
            'upload' => ['required'],
            'featured_image_caption' => ['required']
        ]);

        if($req->has('upload')){
            if(!isset($req->upload[0]) && $req->upload[0]['response' == '']){

                return response()->json([
                    'errors' => [
                        'upload' => ['Please upload featured image.'],
                        'message' => 'Empty field.'
                    ]
                ], 422);
            }
        }
        $user = Auth::user();
        $imgFilename = $req->upload ? $req->upload[0]['response'] : null;
        $datePublished = date('Y-m-d', strtotime($req->date_published));

        Article::where('article_id', $id)
            ->update([
                'title' => ucfirst($req->title),
                'article_content' => $req->article_content,
                'category_id' => $req->category,
                'author_id' => $req->author,
                'encoded_by' => $user->user_id,
                'featured_image' => $imgFilename,
                'featured_image_caption' => $req->featured_image_caption,
                'date_published' => $datePublished,
                'status' => $req->status,
                'is_featured' => $req->is_featured ? 1 : 0
        ]);
        
        if (Storage::exists('public/temp/' . $imgFilename)) {
            // Move the file
            Storage::move('public/temp/' . $imgFilename, 'public/featured_images/' . $imgFilename); 
            Storage::delete('public/temp/' . $imgFilename);
        }

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
      
        $data = Article::find($id);
        $fileName = $data->featured_image;

        if($data->featured_image != '' || $data->featured_image != null){
            if(Storage::exists('public/featured_images/' .$fileName)) {
                Storage::delete('public/featured_images/' . $fileName);
    
                if(Storage::exists('public/temp/' .$fileName)) {
                    Storage::delete('public/temp/' . $fileName);
                }
            }
        }

        Article::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }

    public function getData(Request $req){

        return Article::with('encoded', 'category', 'author')
            ->where('title', 'like', $req->search . '%')
            ->orderBy('article_id', 'desc')
            ->paginate($req->perpage);
    }


    /* ================= */
    public function tempUpload(Request $req){
        $file = $req->featured_image;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('temp', $imageName, 'public');
        $n = explode('/', $imagePath);
        return $n[1];
    }

    public function removeUpload($fileName){
       
        if(Storage::exists('public/temp/' .$fileName)) {

            Storage::delete('public/temp/' . $fileName);

            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }


    // //remove from featured_image folder
    public function articleImageRemove($id, $fileName){

        $data = Article::find($id);
        $data->featured_image = null;
        $data->save();

        if(Storage::exists('public/featured_images/' .$fileName)) {
            Storage::delete('public/featured_images/' . $fileName);

            if(Storage::exists('public/temp/' .$fileName)) {
                Storage::delete('public/temp/' . $fileName);
            }

            return response()->json([
                'status' => 'temp_deleted'
            ], 200);
        }

        return response()->json([
            'status' => 'temp_error'
        ], 200);
    }
    


    
}
