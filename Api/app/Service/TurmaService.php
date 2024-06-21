<?php

namespace App\Service;

use App\Exceptions\TurmaException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\TurmaResource;
use App\Models\Turma;

class TurmaService
{

    public function index()
    {
        try {
            $turma = Turma::paginate();
            return TurmaResource::collection($turma);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }

    public function store(array $request)
    {

        try {
            Turma::create($request);
            return new GeneralResource(["message" => "success"]);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $turma = Turma::findOrFail($id)->first();
            return new TurmaResource($turma);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(array $request, int $id)
    {

        try {
            Turma::where('idTurma', $id)->update($request);
            return new GeneralResource(["message" => "success"]);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }
}
