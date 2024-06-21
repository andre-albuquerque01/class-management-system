'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'

export async function InsertTurma(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const codTurma = request.get('codTurma') as string | null
  const dataInicio = request.get('dataInicio')
  const dataFim = request.get('dataFim')
  const qtdAlunos = request.get('qtdAlunos') as number | null

  try {
    if (!codTurma || !dataInicio || !dataFim || !qtdAlunos || qtdAlunos <= 0)
      throw new Error('Preencha a descrição.')

    const response = await ApiAction('turma', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    const data = await response.json()
    console.log(data)

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (
      message &&
      message.includes('The data fim field must be a date after data inicio.')
    )
      throw new Error('A data de início deve ser maior que a data de fim.')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return { data: null, error: '', ok: false }
  }
}
