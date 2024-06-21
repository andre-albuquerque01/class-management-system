import { AlunoInterface, ShowAluno } from '@/action/aluno/show'
import { DeleteAlunoComponent } from '@/components/deleteAluno'
import Link from 'next/link'

export default async function Aluno() {
  const alunos = (await ShowAluno()) as AlunoInterface[]
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full">
          <div className="pt-4 font-bold text-center">
            <h1 className="text-xl">Aluno</h1>
          </div>
          <div className="w-full flex justify-end py-2">
            <Link
              href="turma/insert"
              className="inline-block py-2 hover:underline text-blue-500"
            >
              Inserir nova turma
            </Link>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-center border-collapse">
              <thead>
                <tr className="border bg-blue-200">
                  <th className="px-4 py-2 border">Posição</th>
                  <th className="px-4 py-2 border">CPF</th>
                  <th className="px-4 py-2 border">Aluno</th>
                  <th className="px-4 py-2 border">Editar aluno</th>
                  <th className="px-4 py-2 border">Remover aluno</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index}</td>
                    <td className="px-4 py-2 border">{aluno.cpf}</td>
                    <td className="px-4 py-2 border">{aluno.nome}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        href={`aluno/${aluno.idAluno}`}
                        className="flex items-center justify-center text-blue-500 hover:underline"
                      >
                        Editar
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">
                      <DeleteAlunoComponent id={aluno.idAluno} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
