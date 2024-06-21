'use server'

import ApiAction from '@/data/apiAction'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface UserInterface {
  id: number
  name: string
  email: string
}

export async function ShowUser() {
  try {
    const response = await ApiAction('user/', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 1060,
        tags: ['user'],
      },
    })
    const data = await response.json()

    if (data.message === 'Unauthenticated.' || !data) {
      cookies().delete('token')
      redirect('/')
    }
    return data.data
  } catch (err) {
    console.log(err)
  }
}
