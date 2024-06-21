'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteTurma(id: number) {
  try {
    await ApiAction(`turma/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    revalidateTag('turma')
  } catch (error) {
    console.log(error)
  }
}
