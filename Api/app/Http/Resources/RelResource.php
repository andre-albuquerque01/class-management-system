<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id_rels,
            'aluno' => new AlunoResource($this->whenLoaded('aluno')),
            'turma' => new TurmaResource($this->whenLoaded('turma')),
        ];
    }
}
