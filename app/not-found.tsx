import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">A página que você está procurando não existe ou foi movida.</p>
        </div>

        <Link href="/">
          <Button className="inline-flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Voltar ao Início
          </Button>
        </Link>
      </div>
    </div>
  )
}
