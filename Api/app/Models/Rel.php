<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rel extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_rels';
    protected $fillable = [
        'alunos_id',
        'turmas_id',
    ];

    public function aluno(): BelongsTo
    {
        return $this->belongsTo(Aluno::class, 'alunos_id', 'idAluno');
    }

    public function turma(): BelongsTo
    {
        return $this->belongsTo(Turma::class, 'turmas_id', 'idTurma');
    }
}
