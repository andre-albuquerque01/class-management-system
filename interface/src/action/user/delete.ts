'use server'

import ApiAction from '@/data/apiAction'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteUser(id: number) {
  try {
    await ApiAction(`user/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    revalidateTag('user')
  } catch (error) {
    console.log(error)
  }
}
