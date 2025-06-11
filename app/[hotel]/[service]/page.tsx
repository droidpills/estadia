import { getHotelById, getServiceById } from "@/lib/data"
import { notFound } from "next/navigation"
import ServiceClientPage from "@/components/service-clientPage"
import { use } from "react"

export default function ServicePage({ params }: { params: Promise<{ hotel: string; service: string }> }) {
  const { hotel: hotelId, service: serviceId } = use(params)

  const hotel = getHotelById(hotelId)
  const service = getServiceById(hotelId, serviceId)

  if (!hotel || !service) {
    notFound()
  }

  return <ServiceClientPage hotel={hotel} service={service} />
}
