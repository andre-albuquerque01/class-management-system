<?php

namespace App\Service;

use App\Exceptions\AlunoException;
use App\Http\Resources\AlunoResource;
use App\Http\Resources\GeneralResource;
use App\Models\Aluno;

class AlunoService
{

    public function index()
    {
        try {
            $aluno = Aluno::paginate();
            return AlunoResource::collection($aluno);
        } catch (\Exception $e) {
            throw new AlunoException();
        }
    }

    public function store(array $data)
    {
        try {
            $cpf = preg_replace('/[^0-9]/', '', $data["cpf"]);
            $data["cpf"] = substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
            if ($data["rendaMensal"] == "") $data["rendaMensal"] = 0;
            Aluno::create($data);
            return new GeneralResource(['message' => "success"]);
        } catch (\Exception $e) {
            throw new AlunoException("" . $e->getMessage());
        }
    }

    public function update(array $data, int $id)
    {
        try {
            $data['cpf'] = preg_replace("/[^0-9]/", "", $data['cpf']);
        
            if ($data['rendaMensal'] === "") {
                $data['rendaMensal'] = 0;
            }

            $aluno = Aluno::findOrFail($id);

            if ($aluno->email !== $data['email'] && Aluno::where('email', $data['email'])->exists()) {
                throw new AlunoException('The email has already been taken.');
            }
            if ($aluno->cpf !== $data['cpf'] && Aluno::where('cpf', $data['cpf'])->exists()) {
                throw new AlunoException('The CPF has already been taken.');
            }
            $aluno->update($data);
            return new GeneralResource(['message' => "success"]);
        } catch (\Exception $e) {
            throw new AlunoException("" . $e->getMessage());
        }
    }
}
