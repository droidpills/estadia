"use client"

import { useState, useMemo } from "react"
import { notFound } from "next/navigation"
import SearchComponent from "@/components/search"
import ServiceCard from "@/components/service-card"
import { getHotelById, getServicesByHotelId, type Service } from "@/lib/data"
import { MapPin } from "lucide-react"

interface HotelPageProps {
  params: {
    hotel: string
  }
}

export default function HotelPage({ params }: HotelPageProps) {
  const hotel = getHotelById(params.hotel)

  // Use useMemo to prevent recreation on every render
  const allServices = useMemo(() => {
    return hotel ? getServicesByHotelId(params.hotel) : []
  }, [params.hotel, hotel])

  const [filteredServices, setFilteredServices] = useState<Service[]>(allServices)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  if (!hotel) {
    notFound()
  }

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

  // Update filtered services when allServices changes
  if (filteredServices.length === 0 && allServices.length > 0 && selectedCategory === "all") {
    setFilteredServices(allServices)
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
                selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
