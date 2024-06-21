import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <main className="flex-grow mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Sistema de Gerenciamento de Turmas e Alunos
          </h1>
          <p className="text-lg mb-8">
            Bem-vindo ao sistema de gerenciamento de turmas e alunos. Aqui você
            pode cadastrar e gerenciar alunos, criar turmas e vincular alunos às
            turmas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Gerenciar Alunos</h2>
              <p className="mb-4">
                Adicione, edite ou remova alunos do sistema.
              </p>
              <Link href="/aluno">
                <span className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Gerenciar Alunos
                </span>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Gerenciar Turmas</h2>
              <p className="mb-4">Crie, edite ou remova turmas do sistema.</p>
              <Link href="/turma">
                <span className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Gerenciar Turmas
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
