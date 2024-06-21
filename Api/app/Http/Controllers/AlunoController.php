<?php

namespace App\Http\Controllers;

use App\Http\Requests\AlunoRequest;
use App\Http\Resources\AlunoResource;
use App\Http\Resources\GeneralResource;
use App\Models\Aluno;
use App\Service\AlunoService;

class AlunoController extends Controller
{

    private $alunoServie;
    public function __construct(AlunoService $alunoServie)
    {
        $this->alunoServie = $alunoServie;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->alunoServie->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AlunoRequest $request)
    {
        return $this->alunoServie->store($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return new AlunoResource(Aluno::findOrFail($id)->first());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AlunoRequest $request, $id)
    {
        return $this->alunoServie->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Aluno::findOrFail($id)->delete();
        return new GeneralResource(['message' => "success"]);
    }
}
