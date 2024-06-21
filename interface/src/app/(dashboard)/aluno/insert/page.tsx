'use client'
import { InsertAluno } from '@/action/aluno/insert'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button className="px-4 py-2 rounded-lg mt-4 bg-blue-600 text-white hover:bg-blue-400">
          Adicionando...
        </button>
      ) : (
        <button className="px-4 py-2 rounded-lg mt-4 bg-blue-600 text-white hover:bg-blue-400">
          Adicionar
        </button>
      )}
    </>
  )
}

export default function CadastroAluno() {
  const [state, action] = useFormState(InsertAluno, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <>
      <div className="flex justify-center">
        <form action={action} className="w-80">
          <div className="mt-5 text-2xl">
            <h1>Cadastro do aluno</h1>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="nome" className="">
              Nome:
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="mt-1 w-full border rounded-lg p-1"
              placeholder="Nome"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              className="mt-1 w-full border rounded-lg p-1"
              min="14"
              max="14"
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="sexo">Sexo:</label>
          </div>
          <div className="flex items-center">
            <label htmlFor="sexo">Femenino:</label>
            <input type="radio" name="sexo" id="sexo" value="f" required />
            <label htmlFor="m" className="ml-5">
              Masculino:
            </label>
            <input type="radio" name="sexo" id="m" value="M" required />
            <label htmlFor="o" className="ml-5">
              Outro:
            </label>
            <input type="radio" name="sexo" id="o" value="O" required />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input
              type="date"
              name="dataNasc"
              id="dataNasc"
              min="1900-01-01"
              className="mt-1 w-full border rounded-lg p-1"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full border rounded-lg p-1"
              step="0.1"
              min="0"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="rendaMensal">Renda mensal:</label>
            <input
              type="number"
              name="rendaMensal"
              id="rendaMensal"
              className="mt-1 w-full border rounded-lg p-1"
              step="0.1"
              min="0"
              placeholder="Renda mensal"
            />
          </div>
          {state.error && (
            <div className="text-red-600 text-center mt-2">{state.error}</div>
          )}
          <FormButton />
        </form>
      </div>
    </>
  )
}
