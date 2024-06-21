'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function UpdateTurma(request: object, id: number) {
  try {
    console.log(request)

    const response = await ApiAction(`turma/${id}`, {
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

    if (message && message.includes('The cod turma field is required'))
      return 'O campo código da turma é obrigatório'
    if (message && message.includes('The qtd alunos field is required.'))
      return 'A quantidade da turma é obrigatório'
    if (
      message &&
      message.includes('The data fim field must be a date after data inicio.')
    )
      return 'A data de início deve ser maior que a data de fim.'
    if (
      message &&
      message.includes(
        'The data inicio field must be a date after or equal to today.',
      )
    )
      return 'A data de início deve ser maior que a data de hoje.'
  } catch (error) {
    return 'Erro ao realizar alteração'
  }
  revalidateTag('turma')
  redirect('/')
}
