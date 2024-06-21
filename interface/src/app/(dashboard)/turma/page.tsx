import { ShowTurma, TurmaInterface } from '@/action/turma/show'
import { DeleteTurmaComponent } from '@/components/deleteTurma'
import { FormatData } from '@/data/formatData'
import Link from 'next/link'

export default async function Turma() {
  const turmas = (await ShowTurma()) as TurmaInterface[]
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full">
          <div className="pt-4 font-bold text-center">
            <h1 className="text-xl">Turma</h1>
          </div>
          <div className="w-full flex justify-end py-2">
            <Link
              href="turma/insert"
              className="inline-block py-2 hover:underline text-blue-500"
            >
              Inserir nova turma
            </Link>
          </div>
          <div className="font-normal w-full overflow-x-auto">
            <table className="min-w-full text-center border-collapse">
              <thead>
                <tr className="border bg-blue-200">
                  <th className="px-4 py-2 border">Posição</th>
                  <th className="px-4 py-2 border">Código Turma</th>
                  <th className="px-4 py-2 border">Data de início</th>
                  <th className="px-4 py-2 border">Data de fim</th>
                  <th className="px-4 py-2 border">Qtd máxima de alunos</th>
                  <th className="px-4 py-2 border">Editar turma</th>
                  <th className="px-4 py-2 border">Remover turma</th>
                </tr>
              </thead>
              <tbody>
                {turmas.map((turma, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 border">{index}</td>
                    <td className="px-4 py-2 border">{turma.codTurma}</td>
                    <td className="px-4 py-2 border">
                      {FormatData(turma.dataInicio)}
                    </td>
                    <td className="px-4 py-2 border">
                      {FormatData(turma.dataFim)}
                    </td>
                    <td className="px-4 py-2 border">{turma.qtdAlunos}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        href={`turma/${turma.idTurma}`}
                        className="flex items-center justify-center text-blue-500 hover:underline"
                        title="Editar"
                      >
                        Editar
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">
                      <DeleteTurmaComponent id={turma.idTurma} />
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
