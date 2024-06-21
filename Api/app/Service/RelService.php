<?php

namespace App\Service;

use App\Exceptions\RelException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\Rel2Resouce;
use App\Http\Resources\RelResource;
use App\Models\Rel;
use App\Models\Turma;

class RelService
{

    public function index()
    {
        try {
            $show = Rel::with('aluno', 'turma')->get();
            return RelResource::collection($show);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(array $request)
    {
        try {
            $turma = Turma::find($request["turmas_id"]);

            if (Rel::where('turmas_id', $request["turmas_id"])->count() >= $turma->qtdAlunos) {
                return new GeneralResource(['message' => 'A turma atingiu o limite máximo de alunos permitidos.']);
            }
            Rel::create($request);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $show = Rel::find($id, "id_rels")->first();
            return new Rel2Resouce($show);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }
    public function showTurma(int $id)
    {
        try {
            $show = Rel::where("turmas_id", $id)->with('aluno', 'turma')->get();
            return RelResource::collection($show);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(array $request, int $id)
    {
        try {
            $turma = Turma::find($request["turmas_id"]);

            if (Rel::where('turmas_id', $request["turmas_id"])->count() >= $turma->qtdAlunos) {
                return new GeneralResource(['message' => 'A turma atingiu o limite máximo de alunos permitidos.']);
            }
            Rel::where("id_rels", $id)->update($request);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            Rel::findOrFail($id)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            throw new RelException();
        }
    }
}
