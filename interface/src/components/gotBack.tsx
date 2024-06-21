'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GotBack = () => {
  const router = useRouter()
  return (
    <div className=" inline-block">
      <div
        onClick={(e) => {
          e.preventDefault()
          router.back()
        }}
        className="flex items-center py-4 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </div>
    </div>
  )
}
