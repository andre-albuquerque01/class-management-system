<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Turma extends Model
{
    protected $table = 'turmas';

    protected $primaryKey = 'idTurma';
    protected $fillable = [
        'codTurma',
        'dataInicio',
        'dataFim',
        'qtdAlunos',
    ];

    public function rel(): HasMany
    {
        return $this->hasMany(Rel::class, 'turmas_id', 'idTurma');
    }
}
