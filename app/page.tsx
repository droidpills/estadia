"use client"

import { useState } from "react"
import SearchComponent from "@/components/search"
import HotelCard from "@/components/hotel-card"
import { hotels } from "@/lib/data"

export default function HomePage() {
  const [filteredHotels, setFilteredHotels] = useState(hotels)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredHotels(hotels)
      return
    }

    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.address.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredHotels(filtered)
  }

  return (
    <div>
      <SearchComponent placeholder="Buscar hotéis por nome ou localização..." onSearch={handleSearch} />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotéis Disponíveis</h1>
          <p className="text-gray-600">Escolha um hotel e reserve seus serviços favoritos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} id={hotel.id} name={hotel.name} address={hotel.address} image={hotel.image} />
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum hotel encontrado com os critérios de busca.</p>
          </div>
        )}
      </section>
    </div>
  )
}
