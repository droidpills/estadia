import { use } from "react"
import { notFound } from "next/navigation"
import { getHotelById, getServicesByHotelId } from "@/lib/data"
import HotelServices from "@/components/hotel-services"
import type { Hotel, Service } from "@/lib/data"

interface HotelPageProps {
  params: Promise<{ hotel: string }>
}

export default function HotelPage({ params }: HotelPageProps) {
  const { hotel: hotelId } = use(params)

  const hotel: Hotel | undefined = getHotelById(hotelId)
  if (!hotel) {
    notFound()
  }

  const services: Service[] = getServicesByHotelId(hotelId)

  return <HotelServices hotel={hotel} allServices={services} />
}
