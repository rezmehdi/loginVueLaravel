<?php

use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TodoController;

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::group(['prefix' => 'books', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [BookController::class, 'index']);
    Route::post('add', [BookController::class, 'add']);
    Route::get('edit/{id}', [BookController::class, 'edit']);
    Route::post('update/{id}', [BookController::class, 'update']);
    Route::delete('delete/{id}', [BookController::class, 'delete']);
});


//Route::group(['prefix'=>'todos','middleware'=>'auth:sanctum'], function (){
    Route::get('/todos',[TodoController::class,'index']);
    Route::post('/todos/create', [TodoController::class, 'store']);
    route::get('/todos/destroy/{id}',[TodoController::class,'destroy']);
    route::get('/todos/destroy-all',[TodoController::class,'destroys']);
    route::post('/todos/done',[TodoController::class,'done']);
    route::post('/todos/update',[TodoController::class,'update']);
//});

