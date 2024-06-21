'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface TurmaInterface {
  idTurma: number
  codTurma: string
  dataInicio: string
  dataFim: string
  qtdAlunos: number
}

export async function ShowTurma() {
  try {
    const response = await ApiAction('turma', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60,
        tags: ['turma'],
      },
    })
    const data = await response.json()

    if (data.message === 'Unauthenticated.') {
      cookies().delete('token')
      return 'Unauthenticated.'
    }
    return data.data
  } catch (err) {
    redirect('/')
  }
}
