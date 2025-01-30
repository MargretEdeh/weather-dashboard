import type React from "react"
import { WeatherCard } from "./WeatherCard"
import { WeatherHighlights } from "./WeatherHighlights"
import type { WeatherData, WeatherError } from "../types/weather"
import { IoAlertCircleSharp } from "react-icons/io5"
import { Button } from "./ui/button"

interface WeatherDisplayProps {
  weatherData: WeatherData | null
  error: WeatherError | null
  loading: boolean
  onAddFavorite: (city: string) => void
  unit: "metric" | "imperial"
  onUnitToggle: () => void
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  error,
  loading,
  onAddFavorite,
  unit,
  onUnitToggle,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <IoAlertCircleSharp className="w-5 h-5" />
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  if (!weatherData) {
    return null
  }

  return (
    <>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather in {weatherData.city}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Today • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <Button
          onClick={() => onAddFavorite(weatherData.city)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add to Favorites
        </Button>
      </div>

      <div className="space-y-8">
        <WeatherCard
          city={weatherData.city}
          temperature={weatherData.temperature}
          condition={weatherData.condition}
          humidity={weatherData.humidity}
          windSpeed={weatherData.windSpeed}
          windDirection={weatherData.windDirection}
          icon={weatherData.icon}
          unit={unit}
          onUnitToggle={onUnitToggle}
        />

        <WeatherHighlights
          highlights={[
            {
              type: "UV",
              value: weatherData.uv.toString(),
              icon: weatherData.icon,
            },
            {
              type: "Sunrise",
              value: weatherData.sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              icon: "https://openweathermap.org/img/wn/01d@2x.png",
            },
            {
              type: "Sunset",
              value: weatherData.sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              icon: "https://openweathermap.org/img/wn/01n@2x.png",
            },
          ]}
        />
      </div>
    </>
  )
}

