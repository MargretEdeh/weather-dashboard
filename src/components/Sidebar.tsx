import React from "react"
import { FaPlus, FaStar, FaTrash } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import type { City } from "../types/city"
import { Button } from "./ui/button"

interface SidebarProps {
  defaultCities: City[]
  favoriteCities: City[]
  onCitySelect: (city: string) => void
  isOpen: boolean
  onClose: () => void
  onAddFavorite: (city: string) => void
  onRemoveFavorite: (city: string) => void
  currentCity?: string
}

export const Sidebar: React.FC<SidebarProps> = ({
  defaultCities,
  favoriteCities,
  onCitySelect,
  isOpen,
  onClose,
  onAddFavorite,
  onRemoveFavorite,
  currentCity,
}) => {
  const [newCity, setNewCity] = React.useState("")

  const handleAddFavorite = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCity.trim()) {
      onAddFavorite(newCity.trim())
      setNewCity("")
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={` 
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-800 p-4 
        border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Weather Dashboard</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <IoClose className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Add to favorites</h3>
          <form onSubmit={handleAddFavorite} className="space-y-2">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <Button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Add to favorites
            </Button>
          </form>
        </div>

        {favoriteCities.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center">
              <FaStar className="w-4 h-4 mr-2 text-yellow-400" />
              Favorite Cities
            </h3>
            <div className="space-y-2">
              {favoriteCities.map((city) => (
                <div
                  key={city.name}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <button onClick={() => onCitySelect(city.name)} className="flex items-center space-x-3 flex-1">
                    <img
                      src={city.image || "/placeholder.svg"}
                      alt={city.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span
                      className={`font-medium ${city.name === currentCity ? "text-blue-500" : "text-gray-900 dark:text-white"}`}
                    >
                      {city.name}
                    </span>
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(city.name)}
                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Popular Cities</h3>
          <div className="space-y-2">
            {defaultCities.map((city) => (
              <button
                key={city.name}
                onClick={() => onCitySelect(city.name)}
                className="flex items-center space-x-3 w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <img
                  src={city.image || "/placeholder.svg"}
                  alt={city.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span
                  className={`font-medium ${city.name === currentCity ? "text-blue-500" : "text-gray-900 dark:text-white"}`}
                >
                  {city.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

