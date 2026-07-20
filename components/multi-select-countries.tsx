"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"

interface MultiSelectCountriesProps {
  selected: string[]
  onChange: (selected: string[]) => void
  required?: boolean
}

const countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Singapore",
  "UAE",
  "Saudi Arabia",
  "Japan",
  "Other",
]

export function MultiSelectCountries({
  selected,
  onChange,
  required,
}: MultiSelectCountriesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggle = (country: string) => {
    if (selected.includes(country)) {
      onChange(selected.filter((c) => c !== country))
    } else {
      onChange([...selected, country])
    }
  }

  const handleRemove = (country: string) => {
    onChange(selected.filter((c) => c !== country))
  }

  const getDisplayText = () => {
    if (selected.length === 0) {
      return "Select Countries"
    }

    if (selected.length === 1) {
      return selected[0]
    }

    if (selected.length === 2) {
      return `${selected[0]}, ${selected[1]}`
    }

    return `${selected[0]}, ${selected[1]} +${selected.length - 2}`
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent text-left flex items-center justify-between hover:border-gray-300 transition-colors"
      >
        <span className={selected.length === 0 ? "text-gray-500" : "text-gray-900"}>
          {getDisplayText()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <p className="text-xs text-gray-500 mt-2">You can select multiple countries.</p>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 max-h-64 overflow-y-auto">
            {countries.map((country) => (
              <label
                key={country}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(country)}
                  onChange={() => handleToggle(country)}
                  className="w-4 h-4 accent-[#00d4ff] rounded cursor-pointer"
                />
                <span className="text-sm text-gray-900">{country}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {selected.length > 0 && !isOpen && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((country) => (
            <div
              key={country}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{country}</span>
              <button
                type="button"
                onClick={() => handleRemove(country)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
