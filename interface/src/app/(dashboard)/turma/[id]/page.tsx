'use client'
import { TurmaInterface } from '@/action/turma/show'
import { ShowOneTurma } from '@/action/turma/showOne'
import { UpdateTurma } from '@/action/turma/update'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

export default function EditTurma({ params }: { params: { id: number } }) {
  const [data, setData] = useState<TurmaInterface>()
  const [erro, setErro] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    const hanldeData = async () => {
      const dt = (await ShowOneTurma(params.id)) as TurmaInterface
      setData(dt)
    }
    hanldeData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dados = Object.fromEntries(formData)
    const ret = await UpdateTurma(dados, data!.idTurma)
    if (ret === 'Unauthenticated.') {
      router.push('/')
    } else if (ret) {
      setErro(ret)
    }
  }
  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-80">
          <div className="mt-5 text-2xl">
            <h1>Cadastro da turma</h1>
          </div>
          <input type="hidden" name="id_turma" />
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="codTurma">Codigo da turma</label>
            <input
              type="text"
              name="codTurma"
              id="codTurma"
              className="mt-1 w-full border rounded-lg p-1"
              placeholder="Código da turma"
              defaultValue={data?.codTurma ?? ''}
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
              defaultValue={data?.dataInicio ?? ''}
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
              defaultValue={data?.dataFim ?? ''}
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
              defaultValue={data?.qtdAlunos ?? ''}
              required
            />
          </div>
          {erro && <div className="text-red-600 text-center mt-2">{erro}</div>}
          <FormButton />
        </form>
      </div>
    </>
  )
}
