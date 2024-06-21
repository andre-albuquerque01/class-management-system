'use client'
import { InsertTurma } from '@/action/turma/insert'
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

export default function CadastroTurma() {
  const [state, action] = useFormState(InsertTurma, {
    ok: false,
    error: '',
    data: null,
  })
  return (
    <>
      <div className="flex justify-center">
        <form action={action} className="w-80">
          <div className="mt-5 text-2xl">
            <h1>Cadastro da turma</h1>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="codTurma">Codigo da turma</label>
            <input
              type="text"
              name="codTurma"
              id="codTurma"
              className="mt-1 w-full border rounded-lg p-1"
              placeholder="Código da turma"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="dataInicio">Data de inicio</label>
            <input
              type="date"
              name="dataInicio"
              id="dataInicio"
              min="1900-01-01"
              className="mt-1 w-full border rounded-lg p-1"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="dataFim">Data de fim</label>
            <input
              type="date"
              name="dataFim"
              id="dataFim"
              min="1900-01-01"
              className="mt-1 w-full border rounded-lg p-1"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="qtdAlunos">Quantidade de aluno</label>
            <input
              type="number"
              name="qtdAlunos"
              id="qtdAlunos"
              min="0"
              className="mt-1 w-full border rounded-lg p-1"
              placeholder="Quantidade de alunos"
              required
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
