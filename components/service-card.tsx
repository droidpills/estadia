import Link from "next/link"
import Image from "next/image"

interface ServiceCardProps {
  id: string
  hotelId: string
  name: string
  description: string
  image: string
}

export default function ServiceCard({ id, hotelId, name, description, image }: ServiceCardProps) {
  return (
    <Link href={`/${hotelId}/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-40">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}
