import { ShowSala } from '@/action/sala/show'
import { SalaInterface } from '@/action/sala/showOne'
import { DeleteSalaComponent } from '@/components/deleteSala'
import Link from 'next/link'

export default async function Sala() {
  const data = await ShowSala()
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full">
          <div className="pt-4 font-bold text-center">
            <h1 className="text-xl">Sala de aula</h1>
          </div>
          <div className="w-full flex justify-end py-2">
            <Link
              href="sala/insert"
              className="inline-block py-2 hover:underline text-blue-500"
            >
              Inserir nova sala
            </Link>
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
                          href={`turma/show/${rel.turma.idTurma}`}
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
                          href={`aluno/${rel.aluno.idAluno}`}
                          className="hover:underline hover:text-red-700"
                        >
                          {rel.aluno.nome}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      <Link
                        href={`sala/${rel.id}`}
                        className="flex items-center justify-center text-blue-500 hover:underline"
                        title="Editar"
                      >
                        Editar sala
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className="flex items-center justify-center text-red-500 hover:underline"
                        title="Excluir"
                      >
                        <DeleteSalaComponent id={rel.id} />
                      </span>
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
