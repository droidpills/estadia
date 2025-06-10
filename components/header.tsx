import Link from "next/link"
import { Building2 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Estadia</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Hotéis
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Sobre
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
