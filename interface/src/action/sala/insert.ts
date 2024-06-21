'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'

export async function InsertSala(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const alunosId = request.get('alunos_id') as number | null
  const turmasId = request.get('turmas_id') as number | null

  try {
    if (!alunosId || !turmasId) throw new Error('Preencha a descrição.')

    const response = await ApiAction('rel', {
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
