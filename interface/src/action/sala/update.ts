'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateSala(request: object, id: number) {
  try {
    console.log(request)

    const response = await ApiAction(`rel/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    if (data.message === 'Unauthenticated.') {
      cookies().delete('token')
      return 'Unauthenticated.'
    }

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('The email has already been taken.'))
      return 'O e-mail já está sendo utilizado.'
    if (message && message.includes('The email field is required.'))
      return 'O e-mail é requerido'
  } catch (error) {
    return 'Erro'
  }
  revalidateTag('aluno')
  redirect('/')
}
