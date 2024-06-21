'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteSala(id: number) {
  try {
    await ApiAction(`rel/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    revalidateTag('sala')
  } catch (error) {
    console.log(error)
  }
}
