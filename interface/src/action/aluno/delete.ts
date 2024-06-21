'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteAluno(id: number) {
  try {
    await ApiAction(`aluno/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    revalidateTag('aluno')
  } catch (error) {
    console.log(error)
  }
}
