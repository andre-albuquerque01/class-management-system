'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateUser(request: object, id: number | undefined) {
  try {
    const response = await ApiAction(`user/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('The email has already been taken.'))
      return 'E-mail já cadastrado!'

    if (message && message.includes('The name field is required.')) {
      return 'Campo nome é requirido.'
    }

    if (message && message.includes('The password field is required.'))
      return 'Senha é requirida.'

    if (message && message.includes('Error updating')) return 'Senha incorreta.'
  } catch (error) {
    return 'Erro'
  }
  revalidateTag('user')
  redirect('/')
}
