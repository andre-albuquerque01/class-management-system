'use client'
import { InsertUser } from '@/action/user/insert'
import { GotBack } from '@/components/gotBack'
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
export default function Register() {
  const [state, action] = useFormState(InsertUser, {
    ok: false,
    error: '',
    data: null,
  })
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-80 mx-auto">
        <div className="self-start">
          <GotBack />
        </div>
        <form action={action} className="">
          <div className="mt-5 text-2xl">
            <h1>Cadastro de usuário</h1>
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              className="mt-1 w-full border rounded-lg p-1"
              autoComplete="name"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
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
          <div className="mt-4">
            <label htmlFor="password_confirmation">Confirma senha</label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              className="mt-1 w-full border rounded-lg p-1"
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
