'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertAluno(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const nome = request.get('nome') as string | null
  const cpf = request.get('cpf') as string | null
  const sexo = request.get('sexo')
  const dataNasc = request.get('dataNasc') as string | null
  const email = request.get('email') as string | null
  const rendaMensal = request.get('rendaMensal') as string | null

  try {
    if (!nome || !cpf || !sexo || !dataNasc || !email || !rendaMensal)
      throw new Error('Preencha a descrição.')

    const response = await ApiAction('aluno', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('The email has already been taken.'))
      throw new Error('O e-mail já está sendo utilizado.')
    revalidateTag('aluno')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return { data: null, error: '', ok: false }
  }
}
