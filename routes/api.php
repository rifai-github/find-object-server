<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\UtilsController;

Route::get('/health_check', [UtilsController::class, 'healthCheck']);

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/login', [UserController::class, 'unauthorized'])->name('login');

Route::middleware('auth:api')->group(function () {
    Route::post('/startgame', [GameController::class, 'startGame']);
    Route::post('/endgame', [GameController::class, 'endGame']);
});
