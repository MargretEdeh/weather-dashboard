import type React from "react"
import { createContext, useState, useContext } from "react"
// Type definition for the unit of measurement.
type Unit = "metric" | "imperial"

interface UnitContextType {
  unit: Unit
  toggleUnit: () => void
}

const UnitContext = createContext<UnitContextType | undefined>(undefined)

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<Unit>("metric")

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"))
  }

  return <UnitContext.Provider value={{ unit, toggleUnit }}>{children}</UnitContext.Provider>
}

export const useUnit = () => {
  const context = useContext(UnitContext)
  if (context === undefined) {
    throw new Error("useUnit must be used within a UnitProvider")
  }
  return context
}

