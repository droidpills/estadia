import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"

interface HotelCardProps {
  id: string
  name: string
  address: string
  image: string
}

export default function HotelCard({ id, name, address, image }: HotelCardProps) {
  return (
    <Link href={`/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{address}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
