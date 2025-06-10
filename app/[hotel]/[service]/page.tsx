"use client"

import type React from "react"

import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import { getHotelById, getServiceById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Star } from "lucide-react"

interface ServicePageProps {
  params: {
    hotel: string
    service: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const router = useRouter()
  const hotel = getHotelById(params.hotel)
  const service = getServiceById(params.hotel, params.service)

  const [formData, setFormData] = useState({
    name: "",
    apartment: "",
    whatsapp: "",
  })

  if (!hotel || !service) {
    notFound()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name || !formData.apartment || !formData.whatsapp) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    // Redirecionar para página de sucesso
    router.push(`/${params.hotel}/${params.service}/success`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-4">
            <span>{hotel.name}</span> / <span className="text-blue-600">{service.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações do Serviço */}
          <div>
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{hotel.name}</span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span>4.8 (124 avaliações)</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center text-blue-800 mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-medium">Informações importantes:</span>
              </div>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Confirmação via WhatsApp necessária</li>
                <li>• Disponível todos os dias das 8h às 22h</li>
                <li>• Cancelamento gratuito até 2h antes</li>
              </ul>
            </div>
          </div>

          {/* Formulário de Reserva */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fazer Reserva</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="apartment">Número do Apartamento</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    type="text"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Ex: 1205"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                  Solicitar Reserva
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">Você receberá uma confirmação via WhatsApp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
