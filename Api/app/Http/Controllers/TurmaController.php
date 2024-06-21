<?php

namespace App\Http\Controllers;

use App\Exceptions\TurmaException;
use App\Http\Requests\TurmaRequest;
use App\Models\Turma;
use App\Service\TurmaService;
use Illuminate\Http\Request;

class TurmaController extends Controller
{
    private $turmaService;

    public function __construct(TurmaService $turmaService)
    {
        $this->turmaService = $turmaService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return  $this->turmaService->index();
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TurmaRequest $request)
    {
        try {
            return  $this->turmaService->store($request->validated());
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
            return  $this->turmaService->show($id);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(TurmaRequest $request, $id)
    {
        try {
            return  $this->turmaService->update($request->validated(), $id);
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            Turma::find($id)->delete();
        } catch (\Exception $e) {
            throw new TurmaException();
        }
    }
}
