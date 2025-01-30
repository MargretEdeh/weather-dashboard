import { useState, useEffect } from "react"
import type { City } from "../types/city"

export const useFavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState<City[]>(() => {
    const saved = localStorage.getItem("favoriteCities")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities))
  }, [favoriteCities])

  const addToFavorites = async (cityName: string) => {
    if (favoriteCities.some((city) => city.name === cityName)) {
      return
    }

    try {
      const cityImage = `https://source.unsplash.com/featured/150x150/?${encodeURIComponent(cityName)},city`
      const newCity: City = {
        name: cityName,
        image: cityImage,
      }

      setFavoriteCities((prev) => [...prev, newCity])
    } catch (error) {
      console.error("Failed to add city to favorites:", error)
    }
  }

  const removeFromFavorites = (cityName: string) => {
    setFavoriteCities((prev) => prev.filter((city) => city.name !== cityName))
  }

  return { favoriteCities, addToFavorites, removeFromFavorites }
}

