'use client'
import { ShowUser, UserInterface } from '@/action/user/show'
import { UpdateUser } from '@/action/user/update'
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

export default function Register() {
  const [data, setData] = useState<UserInterface>()
  const [erro, setErro] = useState<string>()

  useEffect(() => {
    const hanldeData = async () => {
      const dt = (await ShowUser()) as UserInterface
      setData(dt)
    }
    hanldeData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dados = Object.fromEntries(formData)
    const ret = await UpdateUser(dados, data?.id)
    if (ret) {
      setErro(ret)
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-80">
          <div className="mt-5 text-2xl">
            <h1 className="text-justify">Alterar usuário {data?.name}</h1>
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              className="mt-1 w-full border rounded-lg p-1"
              autoComplete="name"
              defaultValue={data?.name ?? ''}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={data?.email ?? ''}
              className="mt-1 w-full border rounded-lg p-1"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              className="mt-1 w-full border rounded-lg p-1"
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
