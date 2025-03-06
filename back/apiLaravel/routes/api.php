<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfesController;
use App\Http\Controllers\ClassController;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');


Route::get('/getTeachers', [ProfesController::class, 'getTeachers']);
Route::get('/getClasses', [ClassController::class, 'getClasses']);