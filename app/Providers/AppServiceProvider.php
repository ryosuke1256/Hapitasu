<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $is_production = env('APP_ENV') === 'production' ? true : false;
        View::share('is_production',$is_production);

        if (request()->isSecure()) {
            \URL::forceScheme('https');
        }
    }
}
