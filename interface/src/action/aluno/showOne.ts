'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function ShowOneAluno(id: number) {
  try {
    const response = await ApiAction(`aluno/${id}`, {
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
    redirect('/')
  }
}
