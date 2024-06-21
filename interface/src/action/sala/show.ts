'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'

export async function ShowSala() {
  try {
    const response = await ApiAction('rel', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
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
