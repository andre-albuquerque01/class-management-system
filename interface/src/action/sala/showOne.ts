'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'

export interface SalaInterface {
  id: number
  id_rels: number
  turmas_id: number
  alunos_id: number
  turma?: {
    idTurma: number
    codTurma: string
    dataInicio: string
    dataFim: string
    qtdAlunos: number
    created_at: string
    updated_at: string
  }
  aluno?: {
    idAluno: number
    nome: string
    cpf: string
    sexo: string
    dataNasc: string
    email: string
    rendaMensal: number
    created_at: string
    updated_at: string
  }
}

export async function ShowOneSala(id: number) {
  try {
    const response = await ApiAction(`rel/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 60,
        tags: ['sala'],
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
    return []
  }
}
