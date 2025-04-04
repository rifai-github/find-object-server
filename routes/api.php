<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UtilsController;

Route::get('/health_check', [UtilsController::class, 'healthCheck']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', [AuthController::class, 'unauthorized'])->name('login');

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);

    Route::post('/startgame', [GameController::class, 'startGame']);
    Route::post('/endgame', [GameController::class, 'endGame']);
});
