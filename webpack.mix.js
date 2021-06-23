const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/ts/index.tsx", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css")
    .postCss("resources/css/style.css", "public/css", [require("tailwindcss")]);

if (mix.inProduction()) {
    mix.version();
}
