import React from "react"
import { useState } from "react"
import { ThemeProvider } from "./context/ThemeContext"
import { UnitProvider } from "./context/UnitContext"
import { WeatherDisplay } from "./components/WeatherDisplay"
import { Sidebar } from "./components/Sidebar"
import { Header } from "./components/Header"
import { PopularCities } from "./components/PopularCities"
import { useWeatherData } from "./hooks/useWeatherData"
import { useFavoriteCities } from "./hooks/useFavouriteCities"
import { useUnit } from "./context/UnitContext"
import { defaultCities } from "./constants/cities"

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { favoriteCities, addToFavorites, removeFromFavorites } = useFavoriteCities()


  // Handles the city search input and updates the selected city state.
  const handleSearch = (query: string) => {
    setSelectedCity(query)
    setSidebarOpen(false)
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setSidebarOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <UnitProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Header onSearch={handleSearch} onMenuClick={toggleSidebar} />
          <div className="flex relative">
            <Sidebar
              defaultCities={defaultCities}
              favoriteCities={favoriteCities}
              onCitySelect={handleCitySelect}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onAddFavorite={addToFavorites}
              onRemoveFavorite={removeFromFavorites}
              currentCity={selectedCity}
              onSearch={handleSearch}
            />

            <main className="flex-1 p-4 md:p-8">
              <WeatherContent
                selectedCity={selectedCity}
                onCitySelect={handleCitySelect}
                addToFavorites={addToFavorites}
              />
            </main>
          </div>
        </div>
      </UnitProvider>
    </ThemeProvider>
  )
}


// WeatherContent component that conditionally displays weather information for the selected city or a list of popular cities.

const WeatherContent: React.FC<{
  selectedCity: string
  onCitySelect: (city: string) => void
  addToFavorites: (city: string) => void
}> = ({ selectedCity, onCitySelect, addToFavorites }) => {
   // Accessing unit context for temperature unit conversion
  const { unit, toggleUnit } = useUnit()
  const { weatherData, error, loading, fetchWeatherData } = useWeatherData(selectedCity, unit)

  React.useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity)
    }
  }, [selectedCity])

  if (selectedCity) {
    return (
      <WeatherDisplay
        weatherData={weatherData}
        error={error}
        loading={loading}
        onAddFavorite={addToFavorites}
        unit={unit}
        onUnitToggle={toggleUnit}
      />
    )
  } else {
    // A fallball UI to show when no city is searched or when the page renders
    return <PopularCities cities={defaultCities} onCitySelect={onCitySelect} unit={unit} onUnitToggle={toggleUnit} />
  }
}

export default App

