"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import SearchComponent from "@/components/search"
import ServiceCard from "@/components/service-card"
import type { Hotel, Service } from "@/lib/data"

interface HotelServicesProps {
  hotel: Hotel
  allServices: Service[]
}

export default function HotelServices({ hotel, allServices }: HotelServicesProps) {
  const [filteredServices, setFilteredServices] = useState<Service[]>(allServices)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleSearch = (query: string) => {
    let filtered = allServices

    if (query.trim()) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    setFilteredServices(filtered)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)

    let filtered = allServices
    if (category !== "all") {
      filtered = filtered.filter((service) => service.category === category)
    }

    setFilteredServices(filtered)
  }

  return (
    <div>
      <SearchComponent placeholder="Buscar serviços do hotel..." onSearch={handleSearch} />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{hotel.address}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Categorias</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {hotel.categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Serviços Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                hotelId={service.hotelId}
                name={service.name}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum serviço encontrado.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
