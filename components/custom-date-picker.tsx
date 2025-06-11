"use client"

import { useState, useRef, useEffect } from "react"
import { format, isValid, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DatePickerProps {
  date: Date | null
  setDate: (date: Date | null) => void
  className?: string
  placeholder?: string
}

export function CustomDatePicker({ date, setDate, className, placeholder = "Selecione uma data" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(date || new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Fechar o calendário quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Navegar para o mês anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navegar para o próximo mês
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Selecionar uma data
  const handleSelectDate = (day: Date) => {
    setDate(day)
    setIsOpen(false)
  }

  // Gerar os dias do mês atual
  const daysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  // Formatar a data para exibição
  const formattedDate = date && isValid(date) ? format(date, "dd/MM/yyyy", { locale: ptBR }) : ""

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div
        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
        <span className={cn(formattedDate ? "text-gray-900" : "text-gray-500")}>{formattedDate || placeholder}</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white p-3 rounded-md shadow-lg border border-gray-200 w-[280px]">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="font-medium">{format(currentMonth, "MMMM yyyy", { locale: ptBR })}</div>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-1">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
              <div key={i} className="h-8 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Dias do mês */}
            {daysInMonth().map((day, i) => {
              const isSelected = date ? isSameDay(day, date) : false
              const isToday = isSameDay(day, new Date())

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm",
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : isToday
                        ? "bg-blue-100 text-blue-900 hover:bg-blue-200"
                        : "hover:bg-gray-100",
                  )}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(new Date())
                setIsOpen(false)
              }}
              className="text-xs"
            >
              Hoje
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(null)
                setIsOpen(false)
              }}
              className="text-xs"
            >
              Limpar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
