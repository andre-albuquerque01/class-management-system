'use client'
import { Logout } from '@/action/user/logout'

export const LogoutComponent = () => {
  const handle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await Logout()
  }
  return <button onClick={handle}>Sair</button>
}
