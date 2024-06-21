<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Rel2Resouce extends JsonResource
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
            'id_rels' => $this->id_rels,
            'alunos_id' => $this->alunos_id,
            'turmas_id' => $this->turmas_id,
        ];
    }
}
