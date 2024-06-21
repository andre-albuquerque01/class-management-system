<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\RelController;
use App\Http\Controllers\TurmaController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     // return Inertia::render('Auth/Login');
//     return redirect(route('Auth/Login'));
// });
Route::get('/entrar', [LoginController::class, 'act'])->name('login');
Route::redirect('/', '/entrar');
Route::post('LogIn', [LoginController::class, 'auth'])->name('LogIn');
// Route::post('LogIn', [AuthController::class, 'login'])->name('LogIn');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [RelController::class, 'index'])->name('dashboard');

    // Cadastro e tela
    // Editar e tela 
    // Aluno
    Route::inertia('/cadastroAluno', 'aluno/CadastroAluno')->name('CadastroAluno');
    Route::post('/alunoCadastro', [AlunoController::class, 'store'])->name('alunoCadastro');
    Route::get('/editAluno/{id}', [AlunoController::class, 'show'])->name('editAluno');
    Route::post('/updateAluno', [AlunoController::class, 'update'])->name('upAluno');
    Route::get('/removeAluno/{id}', [AlunoController::class, 'destroy'])->name('removeAluno');

    // Cadastro e tela
    // Editar e tela 
    // Turma
    Route::inertia('/cadastroTurma', 'turma/CadastroTurma')->name('CadastroTurma');
    Route::post('/turmaCadastro', [TurmaController::class, 'store'])->name('turmaCadastro');
    Route::get('/editTurma/{id}', [TurmaController::class, 'show'])->name('editTurma');
    Route::post('/updateTurma', [TurmaController::class, 'update'])->name('upTurma');
    Route::get('/removeTurma/{id}', [TurmaController::class, 'destroy'])->name('removeTurma');

    // Cadastro sala
    Route::get('/cadastroSala', [RelController::class, 'show'])->name('CadastroSala');
    Route::post('/cadSala', [RelController::class, 'store'])->name('cadSala');
    Route::get('/editSala/{id}', [RelController::class, 'edit'])->name('editSala');
    Route::post('/updateSala', [RelController::class, 'update'])->name('upSala');
    Route::get('/deleteSala/{id}', [RelController::class, 'destroy'])->name('deleteSala');

    Route::get('EditRegistro', [RegisteredUserController::class, 'show'])
        ->name('EditRegistro');
    Route::post('upRegistro', [RegisteredUserController::class, 'update'])
        ->name('upRegistro');

    Route::get('logout',  [LoginController::class, 'destroy'])->name('logout');
});



require __DIR__ . '/auth.php';
