export interface Hotel {
  id: string
  name: string
  address: string
  image: string
  categories: string[]
}

export interface Service {
  id: string
  hotelId: string
  name: string
  description: string
  image: string
  category: string
  fullDescription: string
}

export const hotels: Hotel[] = [
  {
    id: "hotel-copacabana",
    name: "Hotel Copacabana Palace",
    address: "Av. Atlântica, 1702 - Copacabana, Rio de Janeiro",
    image: "/placeholder.svg?height=300&width=400",
    categories: ["Spa", "Restaurante", "Piscina", "Academia"],
  },
  {
    id: "hotel-ipanema",
    name: "Hotel Fasano Ipanema",
    address: "Av. Vieira Souto, 80 - Ipanema, Rio de Janeiro",
    image: "/placeholder.svg?height=300&width=400",
    categories: ["Spa", "Bar", "Piscina", "Room Service"],
  },
  {
    id: "hotel-leblon",
    name: "Marina All Suites",
    address: "Av. Delfim Moreira, 696 - Leblon, Rio de Janeiro",
    image: "/placeholder.svg?height=300&width=400",
    categories: ["Spa", "Restaurante", "Academia", "Lavanderia"],
  },
]

export const services: Service[] = [
  // Hotel Copacabana
  {
    id: "spa-relaxante",
    hotelId: "hotel-copacabana",
    name: "Spa Relaxante",
    description: "Massagem relaxante com óleos essenciais",
    image: "/placeholder.svg?height=250&width=350",
    category: "Spa",
    fullDescription:
      "Desfrute de uma experiência única de relaxamento com nossa massagem terapêutica. Utilizamos óleos essenciais importados e técnicas milenares para proporcionar o máximo bem-estar.",
  },
  {
    id: "jantar-romantico",
    hotelId: "hotel-copacabana",
    name: "Jantar Romântico",
    description: "Jantar especial para casais no terraço",
    image: "/placeholder.svg?height=250&width=350",
    category: "Restaurante",
    fullDescription:
      "Uma noite inesquecível com vista para o mar. Menu degustação preparado pelo nosso chef executivo, acompanhado de vinhos selecionados.",
  },
  // Hotel Ipanema
  {
    id: "aula-yoga",
    hotelId: "hotel-ipanema",
    name: "Aula de Yoga",
    description: "Sessão de yoga matinal na cobertura",
    image: "/placeholder.svg?height=250&width=350",
    category: "Spa",
    fullDescription:
      "Comece o dia com energia positiva em nossa aula de yoga na cobertura, com vista panorâmica da praia de Ipanema.",
  },
  {
    id: "happy-hour",
    hotelId: "hotel-ipanema",
    name: "Happy Hour Premium",
    description: "Drinks especiais no rooftop bar",
    image: "/placeholder.svg?height=250&width=350",
    category: "Bar",
    fullDescription:
      "Desfrute dos melhores coquetéis da cidade em nosso rooftop bar, com vista deslumbrante do pôr do sol em Ipanema.",
  },
  // Hotel Leblon
  {
    id: "personal-trainer",
    hotelId: "hotel-leblon",
    name: "Personal Trainer",
    description: "Treino personalizado na academia",
    image: "/placeholder.svg?height=250&width=350",
    category: "Academia",
    fullDescription:
      "Sessão de treino personalizada com nosso personal trainer certificado. Equipamentos de última geração e acompanhamento profissional.",
  },
  {
    id: "lavanderia-expressa",
    hotelId: "hotel-leblon",
    name: "Lavanderia Expressa",
    description: "Serviço de lavanderia em 2 horas",
    image: "/placeholder.svg?height=250&width=350",
    category: "Lavanderia",
    fullDescription: "Serviço de lavanderia rápido e eficiente. Suas roupas limpas e passadas em apenas 2 horas.",
  },
]

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.id === id)
}

export function getServicesByHotelId(hotelId: string): Service[] {
  return services.filter((service) => service.hotelId === hotelId)
}

export function getServiceById(hotelId: string, serviceId: string): Service | undefined {
  return services.find((service) => service.hotelId === hotelId && service.id === serviceId)
}
