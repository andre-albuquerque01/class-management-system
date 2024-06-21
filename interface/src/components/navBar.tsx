import Link from 'next/link'
import { LogoutComponent } from './logout'

export default function NavBar() {
  return (
    <header className="border-b-2">
      <div className="flex justify-between items-center p-5  max-w-[1200px] mx-auto max-sm:flex-col max-sm:justify-between max-sm:items-center">
        <div className="">
          <h1 className="font-bold">
            <Link href="/dashboard">Desafio</Link>
          </h1>
        </div>
        <nav className="max-sm:w-full">
          <ul className="list-none flex justify-evenly items-center sm:gap-5 max-sm:items-center max-sm:justify-evenly capitalize">
            <li className="hover:underline">
              <Link href="/aluno">aluno</Link>
            </li>
            <li className="hover:underline">
              <Link href="/turma">turma</Link>
            </li>
            <li className="hover:underline">
              <Link href="/sala">sala</Link>
            </li>
            <li className="hover:underline">
              <Link href="/user/update">Perfil</Link>
            </li>
            <li className="hover:underline">
              <LogoutComponent />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
