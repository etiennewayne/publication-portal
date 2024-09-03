<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Category;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Inertia::share([
            // Example: Authenticated user
            'categories' => function () {
                return Category::where('active', 1)->count() > 0
                    ? Category::orderBy('category', 'asc')->select('category_id','category', 'slug')->get()
                    : null;
            },

          
        ]);
    }
}
