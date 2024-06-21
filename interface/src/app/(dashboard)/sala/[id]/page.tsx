'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { AlunoInterface, ShowAluno } from '@/action/aluno/show'
import { SalaInterface, ShowOneSala } from '@/action/sala/showOne'
import { UpdateSala } from '@/action/sala/update'
import { ShowTurma, TurmaInterface } from '@/action/turma/show'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button className="px-4 py-2 rounded-lg mt-4 bg-blue-600 text-white hover:bg-blue-400">
          Alterando...
        </button>
      ) : (
        <button className="px-4 py-2 rounded-lg mt-4 bg-blue-600 text-white hover:bg-blue-400">
          Alterar
        </button>
      )}
    </>
  )
}

export default function CadastroSala({ params }: { params: { id: number } }) {
  const [data, setData] = useState<SalaInterface>()
  const [alunos, setAlunos] = useState<AlunoInterface[]>([])
  const [turmas, setTurmas] = useState<TurmaInterface[]>([])
  const [erro, setErro] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    const hanldeData = async () => {
      const dt = (await ShowOneSala(params.id)) as SalaInterface
      setData(dt)
      const responseAluno = (await ShowAluno()) as AlunoInterface[]
      setAlunos(responseAluno)
      const responseTurma = (await ShowTurma()) as TurmaInterface[]
      setTurmas(responseTurma)
    }
    hanldeData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dados = Object.fromEntries(formData)
    const ret = await UpdateSala(dados, data!.id)
    if (ret === 'Unauthenticated.') {
      router.push('/')
    } else if (ret) {
      setErro(ret)
    }
  }

  return (
    <Suspense>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-80">
          <div className="mt-5 text-2xl">
            <h1>Alterar a sala</h1>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="aluno">Aluno</label>
            <select
              name="alunos_id"
              id="aluno"
              className="mt-1 w-full border rounded-lg p-1"
              required
            >
              <option value="" disabled>
                Selecione um aluno
              </option>
              {alunos.map((aluno) => (
                <option
                  key={aluno.idAluno}
                  value={aluno.idAluno}
                  defaultChecked={data?.alunos_id === aluno.idAluno}
                >
                  {aluno.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="turma">Turma</label>
            <select
              name="turmas_id"
              id="turma"
              className="mt-1 w-full border rounded-lg p-1"
              required
            >
              <option value="" disabled>
                Selecione uma turma
              </option>
              {turmas.map((turma) => (
                <option
                  key={turma.idTurma}
                  value={turma.idTurma}
                  defaultChecked={data?.turmas_id === turma.idTurma}
                >
                  {turma.codTurma}
                </option>
              ))}
            </select>
          </div>
          {erro && <div className="text-red-600 text-center mt-2">{erro}</div>}
          <FormButton />
        </form>
      </div>
    </Suspense>
  )
}
