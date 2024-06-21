<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aluno extends Model
{
    use HasFactory;
    protected $table = 'alunos';
    protected $primaryKey = 'idAluno';

    protected $fillable = [
        'nome',
        'cpf',
        'sexo',
        'dataNasc',
        'email',
        'rendaMensal',
    ];

    public function rel(): HasMany
    {
        return $this->hasMany(Aluno::class, 'alunos_id', 'idAluno');
    }
}
