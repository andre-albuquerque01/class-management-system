<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlunoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'nome' => 'required|string|max:100',
            'cpf' => 'required|max:14|min:14|unique:alunos,cpf',
            'sexo' => 'required',
            'rendaMensal' => 'required',
            'dataNasc' => 'required|date',
            'email' => 'required|email|unique:alunos,email',
        ];

        if($this->method() == "PUT"){
            $rules['nome'] = 'nullable';
            $rules['cpf'] = 'nullable|max:14|min:14';
            $rules['sexo'] = 'nullable';
            $rules['dataNasc'] = 'nullable';
            $rules['email'] = 'nullable|email';
        }

        return $rules;
    }
}
