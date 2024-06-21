/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { AlunoInterface } from '@/action/aluno/show'
import { ShowOneAluno } from '@/action/aluno/showOne'
import { UpdateAluno } from '@/action/aluno/update'
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

export default function EditAluno({ params }: { params: { id: number } }) {
  const [data, setData] = useState<AlunoInterface>()
  const [erro, setErro] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    const hanldeData = async () => {
      const dt = (await ShowOneAluno(params.id)) as AlunoInterface
      setData(dt)
    }
    hanldeData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dados = Object.fromEntries(formData)
    const ret = await UpdateAluno(dados, data!.idAluno)
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
              defaultValue={data?.nome ?? ''}
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
              defaultValue={data?.cpf ?? ''}
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="sexo">Sexo:</label>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="sexo">Femenino:</label>
              <input
                type="radio"
                name="sexo"
                id="sexo"
                value="F"
                checked={data?.sexo === 'F'}
                required
              />
            </div>
            <div>
              <label htmlFor="sexo" className="">
                Masculino:
              </label>
              <input
                type="radio"
                name="sexo"
                id="sexo"
                value="M"
                checked={data?.sexo === 'M'}
                required
              />
            </div>
            <div>
              <label htmlFor="sexo" className="">
                Outro:
              </label>
              <input
                type="radio"
                name="sexo"
                id="sexo"
                value="O"
                checked={data?.sexo === 'O'}
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1 mt-4">
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input
              type="date"
              name="dataNasc"
              id="dataNasc"
              min="1900-01-01"
              className="mt-1 w-full border rounded-lg p-1"
              defaultValue={data?.dataNasc ?? ''}
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
              defaultValue={data?.email ?? ''}
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
              defaultValue={data?.rendaMensal ?? ''}
              placeholder="Renda mensal"
            />
          </div>
          {erro && <div className="text-red-600 text-center mt-2">{erro}</div>}
          <FormButton />
        </form>
      </div>
    </>
  )
}
