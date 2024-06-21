'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'

export interface AlunoInterface {
  idAluno: number
  nome: string
  sexo: string
  dataNasc: string
  rendaMensal: string
  email: string
  cpf: string
}

export async function ShowAluno() {
  try {
    const response = await ApiAction('aluno', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60,
        tags: ['aluno'],
      },
    })
    const data = await response.json()

    if (data.message === 'Unauthenticated.') {
      cookies().delete('token')
      return 'Unauthenticated.'
    }
    return data.data
  } catch (err) {
    console.log(err)
  }
}
