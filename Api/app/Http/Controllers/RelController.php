<?php

namespace App\Http\Controllers;

use App\Http\Requests\RelRequest;
use App\Models\Aluno;
use App\Models\Rel;
use App\Models\Turma;
use App\Service\RelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelController extends Controller
{

    private $relService;

    public function __construct(RelService $relService)
    {
        $this->relService = $relService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->relService->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RelRequest $request)
    {
        return $this->relService->store($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
       return $this->relService->show($id);
    }
    
    public function showTurma(int $id)
    {
       return $this->relService->showTurma($id);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(RelRequest $request, int $id)
    {
        return $this->relService->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->relService->destroy($id);
    }
}
