/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { AlunoInterface, ShowAluno } from '@/action/aluno/show'
import { InsertSala } from '@/action/sala/insert'
import { ShowTurma, TurmaInterface } from '@/action/turma/show'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

export default function CadastroSala() {
  const [state, action] = useFormState(InsertSala, {
    ok: false,
    error: '',
    data: null,
  })

  const [alunos, setAlunos] = useState<AlunoInterface[]>([])
  const [turmas, setTurmas] = useState<TurmaInterface[]>([])
  const router = useRouter()

  useEffect(() => {
    const handleData = async () => {
      const responseAluno = (await ShowAluno()) as AlunoInterface[]
      setAlunos(responseAluno)
      const responseTurma = (await ShowTurma()) as TurmaInterface[]
      setTurmas(responseTurma)
    }
    handleData()
  }, [])

  useEffect(() => {
    if (state.ok) {
      alert('Aluno inserido na sala com sucesso!')
      router.push('/dashboard')
    }
  }, [state.ok])

  return (
    <>
      <div className="flex justify-center">
        <form action={action} className="w-80">
          <div className="mt-5 text-2xl">
            <h1>Inserir em sala o aluno</h1>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="aluno">Aluno:</label>
            <select
              name="alunos_id"
              id="aluno"
              className="mt-1 w-full border rounded-lg p-1"
              required
            >
              <option value="" defaultChecked>
                Selecione um aluno
              </option>
              {alunos &&
                alunos.length > 0 &&
                alunos.map((aluno) => (
                  <option key={aluno.idAluno} value={aluno.idAluno}>
                    {aluno.nome}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="turma">Turma:</label>
            <select
              name="turmas_id"
              id="turma"
              className="mt-1 w-full border rounded-lg p-1"
              required
            >
              <option value="" defaultChecked>
                Selecione uma turma
              </option>
              {turmas &&
                turmas.length > 0 &&
                turmas.map((turma) => (
                  <option key={turma.idTurma} value={turma.idTurma}>
                    {turma.codTurma}
                  </option>
                ))}
            </select>
            <span className="text-red-500 mt-2">{state.error}</span>
          </div>
          <FormButton />
        </form>
      </div>
    </>
  )
}
