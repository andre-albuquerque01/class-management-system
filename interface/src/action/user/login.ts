'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Login(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  try {
    const email = request.get('email') as string | null
    const password = request.get('password') as string | null

    if (!email || !password) throw new Error('Preenchas os dados!')

    const cookiesStore = cookies()
    const response = await ApiAction('auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('E-mail não verificado')) {
      throw new Error('E-mail não verificado!')
    }

    if (message && message.includes('Email or password incorrect')) {
      throw new Error('E-mail ou senha invalida!')
    }

    if (message && message.includes('Unauthorized')) {
      throw new Error('E-mail ou senha invalida!')
    }

    if (message && message.includes('Email not registered')) {
      throw new Error('E-mail não registrado!')
    }

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })

    if (!response.ok) throw new Error('Usuário ou senha inválido!')
  } catch (error) {
    return { data: null, error: 'Error ao fazer login.', ok: false }
  }
  redirect('/dashboard')
}
