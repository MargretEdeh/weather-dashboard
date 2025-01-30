import { useState, useEffect, useCallback } from "react"
import { getWeatherByCity } from "../services/weather"
import type { WeatherData, WeatherError } from "../types/weather"

// Custom hook to fetch and manage weather data for a given city.

export const useWeatherData = (initialCity: string, unit: "metric" | "imperial") => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<WeatherError | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetches weather data for a given city and updates state accordingly.
  const fetchWeatherData = useCallback(
    async (city: string) => {
      try {
        setLoading(true)
        setError(null)
        const data = await getWeatherByCity(city, unit)
        setWeatherData(data)
      } catch (err) {
        setError({ message: err instanceof Error ? err.message : "Failed to fetch weather data" })
        setWeatherData(null)
      } finally {
        // .finally ensures that setLoading(false) is executed regardless of whether the request succeeds or fails.
        // as discussed in the first phase of the interview. Thank you
        setLoading(false)
      }
    },
    [initialCity],
  )
  
// Fetch weather data on mount or when initialCity changes
  useEffect(() => {
    if (initialCity) {
      fetchWeatherData(initialCity)
    }
  }, [initialCity, fetchWeatherData])

  return { weatherData, error, loading, fetchWeatherData }
}

