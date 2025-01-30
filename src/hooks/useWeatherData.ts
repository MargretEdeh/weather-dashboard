import { useState, useEffect, useCallback } from "react"
import { getWeatherByCity } from "../services/weather"
import type { WeatherData, WeatherError } from "../types/weather"

export const useWeatherData = (initialCity: string, unit: "metric" | "imperial") => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<WeatherError | null>(null)
  const [loading, setLoading] = useState(false)

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
        setLoading(false)
      }
    },
    [initialCity],
  )

  useEffect(() => {
    if (initialCity) {
      fetchWeatherData(initialCity)
    }
  }, [initialCity, fetchWeatherData])

  return { weatherData, error, loading, fetchWeatherData }
}

