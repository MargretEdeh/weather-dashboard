// src/components/WeatherMain.tsx
import React from 'react';
import { WeatherCard } from './WeatherCard';
import { WeatherHighlights } from './WeatherHighlights';
import { PopularCities } from './PopularCities';
import { IoAlertCircleSharp } from "react-icons/io5";
import { WeatherData } from '../types/weather';

interface WeatherMainProps {
  weatherData: WeatherData | null;
  error: { message: string } | null;
  loading: boolean;
  popularWeather: WeatherData[];
  unit: 'metric' | 'imperial';
  onUnitToggle: () => void;
  onAddFavorite: (cityName: string) => void;
}

export const WeatherMain: React.FC<WeatherMainProps> = ({
  weatherData,
  error,
  loading,
  popularWeather,
  unit,
  onUnitToggle,
  onAddFavorite,
}) => {
  return (
    <main className="flex-1 p-4 md:p-8">
      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <IoAlertCircleSharp className="w-5 h-5" />
            <p>{error.message}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && !error && weatherData ? (
        <>
          <div className="mb-8 flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Weather in {weatherData.city}
            </h2>
            <button
              onClick={() => onAddFavorite(weatherData.city)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Favorites
            </button>
          </div>

          <WeatherCard {...weatherData} unit={unit} onUnitToggle={onUnitToggle} />
          <WeatherHighlights highlights={weatherData.highlights} />
        </>
      ) : (
        !loading && !error && <PopularCities cities={popularWeather} onCitySelect={onAddFavorite} unit={unit} onUnitToggle={onUnitToggle} />
      )}
    </main>
  );
};
