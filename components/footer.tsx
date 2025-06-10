export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Estadia</h3>
            <p className="text-gray-400">Plataforma para reserva de serviços hoteleiros de forma simples e rápida.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contato@estadia.com</li>
              <li>(11) 9999-9999</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Estadia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
