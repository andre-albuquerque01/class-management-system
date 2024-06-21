import { SalaInterface } from '@/action/sala/showOne'
import { ShowOneTurmaSala } from '@/action/turma/showTurma'
import { DeleteSalaComponent } from '@/components/deleteSala'
import Link from 'next/link'

export default async function GetTurma({ params }: { params: { id: number } }) {
  const data = await ShowOneTurmaSala(params.id)

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full">
          <div className="pt-4 font-bold text-center py-2">
            <h1 className="text-xl">Turma com alunos</h1>
          </div>
          <div className="font-normal w-full overflow-x-auto">
            <table className="min-w-full text-center border-collapse">
              <thead>
                <tr className="border bg-blue-200">
                  <th className="px-4 py-2 border">Posição</th>
                  <th className="px-4 py-2 border">Código da turma</th>
                  <th className="px-4 py-2 border">Aluno</th>
                  <th className="px-4 py-2 border">Editar sala</th>
                  <th className="px-4 py-2 border">Remover sala</th>
                </tr>
              </thead>
              <tbody>
                {data.map((rel: SalaInterface, index: number) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {rel.turma && (
                        <Link
                          key={rel.turma.idTurma}
                          href={`/turma/${rel.turma.idTurma}`}
                          className="hover:underline hover:text-blue-700"
                        >
                          {rel.turma.codTurma}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {rel.aluno && (
                        <Link
                          key={rel.aluno.idAluno}
                          href={`/aluno/${rel.aluno.idAluno}`}
                          className="hover:underline hover:text-red-700"
                        >
                          {rel.aluno.nome}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <Link
                        href={`/sala/${rel.id_rels}`}
                        className="flex items-center justify-center text-blue-500 hover:underline"
                        title="Editar"
                      >
                        Editar sala
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">
                      <a
                        href={`/sala/${rel.id_rels}`}
                        className="flex items-center justify-center text-red-500 hover:underline"
                        title="Excluir"
                      >
                        <DeleteSalaComponent id={rel.id_rels} />
                      </a>
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
