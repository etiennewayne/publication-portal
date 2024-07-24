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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/admin/dashboard', [App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/articles', [App\Http\Controllers\Admin\AdminArticleController::class, 'index'])->name('admin.articles.index');
    Route::get('/admin/articles/create', [App\Http\Controllers\Admin\AdminArticleController::class, 'create'])->name('admin.articles.create');


    Route::get('/admin/users', [App\Http\Controllers\Admin\AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/create', [App\Http\Controllers\Admin\AdminUserController::class, 'create'])->name('admin.users.create');
    Route::get('/admin/get-users', [App\Http\Controllers\Admin\AdminUserController::class, 'getData'])->name('admin.users.create');


});

require __DIR__.'/auth.php';




// logout auth (use for debuggin only)
Route::get('/applogout', function(Request $req){

    Auth::guard('web')->logout();
    $req->session()->invalidate();

    $req->session()->regenerateToken();

    return redirect('/');
});

