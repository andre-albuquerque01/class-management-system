<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->id('idAluno');
            $table->string('nome')->nullable(false);
            $table->string('cpf', 14)->unique()->nullable(false);
            $table->char('sexo', 2)->nullable(false);
            $table->date('dataNasc')->nullable(false); 
            $table->string('email', 150)->unique()->nullable(false);
            $table->float('rendaMensal', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
