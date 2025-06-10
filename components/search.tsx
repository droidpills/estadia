"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchProps {
  placeholder: string
  onSearch?: (query: string) => void
}

export default function SearchComponent({ placeholder, onSearch }: SearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <div className="bg-blue-50 py-8">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-6">
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
