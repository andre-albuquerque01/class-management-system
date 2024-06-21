<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
Route::get('register', [RegisteredUserController::class, 'create'])
    ->name('register');

Route::post('registro', [RegisteredUserController::class, 'store'])
    ->name('registro');

});

Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])
        ->name('logout');
});
