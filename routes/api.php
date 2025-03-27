<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UtilsController;

Route::get('/health_check', [UtilsController::class, 'healthCheck']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Hanya bisa diakses dengan token
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
