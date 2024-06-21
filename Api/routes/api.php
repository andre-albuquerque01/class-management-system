<?php

use App\Http\Controllers\AlunoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RelController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\UserController;

Route::get("/", function () {
    return response()->json(["AAAAAAAAAA"]);
});

Route::prefix("v1")->group(function () {

    Route::post("auth", [AuthController::class, "login"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::apiResource("user", UserController::class);
    Route::middleware('auth:api')->group(function () {
        Route::apiResource("rel", RelController::class);
        Route::get("showTurma/{id}", [RelController::class, 'showTurma']);
        Route::apiResource("turma", TurmaController::class);
        Route::apiResource("aluno", AlunoController::class);
    });
});
