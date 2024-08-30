<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


/** =======================================
 * CATEGORY PAGES HERE
 * ========================================
 */
Route::get('/categories', [App\Http\Controllers\CategoryPageController::class, 'index']);

Route::get('/view/{slug}', [App\Http\Controllers\ViewPageController::class, 'index'])->name('view');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/load-categories', [App\Http\Controllers\OpenController::class, 'loadCategories'])->name('load.categories');
Route::get('/load-acacemic-years', [App\Http\Controllers\OpenController::class, 'loadAcademicYears']);


Route::get('/load-featured-article', [App\Http\Controllers\ArticleController::class, 'loadFeaturedArtice']);
Route::get('/load-side-articles', [App\Http\Controllers\ArticleController::class, 'loadSideArticles']);
Route::get('/load-latest-articles', [App\Http\Controllers\ArticleController::class, 'loadaLatestArtcles']);

Route::post('/count-view/{id}', [App\Http\Controllers\ArticleController::class, 'incrementView']);



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/admin/dashboard', [App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Route::get('/admin/articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'index'])->name('admin.articles.index');
    // Route::get('/admin/articles/create', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');
    // Route::get('/admin/get-articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');
  

    Route::get('/admin/users', [App\Http\Controllers\Admin\AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/create', [App\Http\Controllers\Admin\AdminUserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [App\Http\Controllers\Admin\AdminUserController::class, 'store'])->name('admin.users.store');
    Route::put('/admin/users/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'update'])->name('admin.users.update');
    Route::get('/admin/users/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'show'])->name('admin.users.show');
    Route::get('/admin/get-users', [App\Http\Controllers\Admin\AdminUserController::class, 'getData'])->name('admin.users.create');
    Route::delete('/admin/users/{id}', [App\Http\Controllers\Admin\AdminUserController::class, 'destroy'])->name('admin.users.destroy');


    Route::resource('/admin/academic-years', App\Http\Controllers\Admin\AdminAcademicYearController::class);
    Route::get('/admin/get-academic-years', [App\Http\Controllers\Admin\AdminAcademicYearController::class, 'getData']);

    Route::get('/admin/categories', [App\Http\Controllers\Admin\AdminCategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('/admin/categories/create', [App\Http\Controllers\Admin\AdminCategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('/admin/categories', [App\Http\Controllers\Admin\AdminCategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/admin/categories/{id}', [App\Http\Controllers\Admin\AdminCategoryController::class, 'update'])->name('admin.categories.update');
    Route::get('/admin/categories/{id}', [App\Http\Controllers\Admin\AdminCategoryController::class, 'show'])->name('admin.categories.show');
    Route::get('/admin/get-categories', [App\Http\Controllers\Admin\AdminCategoryController::class, 'getData'])->name('admin.categories.getdata');
    Route::delete('/admin/categories/{id}', [App\Http\Controllers\Admin\AdminCategoryController::class, 'destroy'])->name('admin.categories.destroy');
    

    Route::get('/admin/articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'index'])->name('admin.articles.index');
    Route::get('/admin/articles/create', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');
    Route::post('/admin/articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'store'])->name('admin.articles.store');
    Route::get('/admin/articles/{id}/edit', [App\Http\Controllers\Admin\AdminArticleController::class, 'edit'])->name('admin.articles.edit');
    Route::patch('/admin/articles/{id}', [App\Http\Controllers\Admin\AdminArticleController::class, 'update'])->name('admin.articles.update');
    Route::get('/admin/articles/{id}', [App\Http\Controllers\Admin\AdminArticleController::class, 'show'])->name('admin.articles.show');
    Route::get('/admin/get-articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'getData'])->name('admin.articles.getdata');
    Route::delete('/admin/articles/{id}', [App\Http\Controllers\Admin\AdminArticleController::class, 'destroy'])->name('admin.articles.destroy');
    Route::post('/temp-upload', [App\Http\Controllers\Admin\AdminArticleController::class, 'tempUpload']);
    Route::post('/temp-remove/{filename}', [App\Http\Controllers\Admin\AdminArticleController::class, 'removeUpload']);
    Route::post('/article-image-remove/{id}/{filename}', [App\Http\Controllers\Admin\AdminArticleController::class, 'articleImageRemove']);


});

require __DIR__.'/auth.php';




// logout auth (use for debuggin only)
Route::get('/applogout', function(Request $req){

    Auth::guard('web')->logout();
    $req->session()->invalidate();

    $req->session()->regenerateToken();

    return redirect('/');
});




Route::get('/ck-editor', function () {
    return Inertia::render('CKEditor');
});

Route::get('/test', function () {
    return Inertia::render('Test');
});


Route::get('/basic', function () {
    return Inertia::render('Admin/Article/Basic');
});