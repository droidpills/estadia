"use client"

import { useRouter } from "next/navigation"
import { getHotelById, getServiceById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { CheckCircle, MessageCircle, ArrowLeft } from "lucide-react"

interface SuccessPageProps {
  params: {
    hotel: string
    service: string
  }
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const router = useRouter()
  const hotel = getHotelById(params.hotel)
  const service = getServiceById(params.hotel, params.service)

  if (!hotel || !service) {
    router.push("/")
    return null
  }

  const handleReserveMore = () => {
    router.push(`/${params.hotel}`)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Solicitação Enviada!</h1>

          <p className="text-lg text-gray-600 mb-8">
            Sua solicitação para <strong>{service.name}</strong> no <strong>{hotel.name}</strong> foi enviada com
            sucesso.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">Próximos Passos</h2>
          </div>

          <div className="text-blue-800 space-y-2">
            <p>• Você receberá uma mensagem no WhatsApp em até 15 minutos</p>
            <p>• Nossa equipe confirmará os detalhes da sua reserva</p>
            <p>• Você poderá escolher o melhor horário disponível</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button onClick={handleReserveMore} className="w-full h-12 text-lg">
            Reservar Mais Serviços
          </Button>

          <Button onClick={handleBackToHome} variant="outline" className="w-full h-12 text-lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Início
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Dúvidas? Entre em contato conosco pelo WhatsApp:
            <a href="https://wa.me/5511999999999" className="text-blue-600 hover:underline ml-1">
              (11) 99999-9999
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
