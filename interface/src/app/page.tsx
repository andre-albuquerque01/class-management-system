'use client'
import { Login } from '@/action/user/login'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button className="px-10 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-400">
          Entrando...
        </button>
      ) : (
        <button className="px-10 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-400">
          Entrar
        </button>
      )}
    </>
  )
}

export default function Home() {
  const [state, action] = useFormState(Login, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form action={action}>
        <div>
          <label htmlFor="email" defaultValue="Email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 w-full border rounded-lg p-1"
            autoComplete="username"
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
        {state.error && (
          <div className="text-red-600 text-center mt-2">{state.error}</div>
        )}
        <div className="flex justify-center mt-4">
          <FormButton />
        </div>
      </form>
      <div className="h-0.5 bg-zinc-200 w-60 mt-7"></div>
      <div className="mt-5 text-center">
        <Link href="/user/insert" className="text-gray-400 hover:underline">
          Não tem cadastro?
        </Link>
      </div>
    </div>
  )
}
