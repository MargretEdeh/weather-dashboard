import  { useEffect, useState } from "react";
import type { WeatherData } from "../types/weather";
import { getWeatherByCity } from "../services/weather";
import { FaWind, FaThermometerHalf } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import type { City } from "../types/city";
import { WeatherFeatures } from "./WeatherFeatures";

interface PopularCitiesProps {
  cities: City[];
  unit: "metric" | "imperial";
  onUnitToggle: () => void;
  onCitySelect: (city: string) => void;
}

export const PopularCities = ({ unit, cities, onUnitToggle, onCitySelect }: PopularCitiesProps) => {
  const [popularWeather, setPopularWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCitiesWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const weatherPromises = cities.map(async (city) => {
          try {
            return await getWeatherByCity(city.name, unit);
          } catch (err) {
            console.error(`Failed to fetch weather for ${city.name}:`, err);
            return {
              city: city.name,
              temperature: 0,
              condition: "Unknown",
              description: "N/A",
              humidity: 0,
              windSpeed: 0,
              windDirection: "N/A",
              sunrise: new Date(),
              sunset: new Date(),
              uv: 0,
              icon: "/placeholder.svg",
              unit: unit,
            };
          }
        });

        const weatherData = await Promise.all(weatherPromises);
        setPopularWeather(weatherData);
      } catch (err) {
        setError(`the error ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCitiesWeather();
  }, [unit, cities]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-1 gap-5 md:space-y-6">
      <div className="flex w-s justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular Cities Weather</h2>
        <Button
          onClick={onUnitToggle}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 border-0 rounded-full transition-colors"
        >
          <FaThermometerHalf className="w-4 h-4" />
          <span>Switch to °{unit === "metric" ? "F" : "C"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularWeather.map((city: WeatherData) => (
          <Card
            key={city.city}
            className="hover:shadow-lg  transition-all duration-200 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => onCitySelect(city.city)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-gray-900 dark:text-white">{city.city}</CardTitle>
                <img src={city.icon || "/placeholder.svg"} alt={city.condition} className="w-12 h-12" />
              </div>
              <CardDescription className="capitalize text-gray-700 dark:text-gray-300">{city.condition}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {city.temperature}°{unit === "metric" ? "C" : "F"}
                </div>
                <div className="flex space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FaDroplet className="w-4 h-4 mr-1" />
                    <span>{city.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <FaWind className="w-4 h-4 mr-1" />
                    <span>
                      {city.windSpeed} {unit === "metric" ? "km/h" : "mph"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <WeatherFeatures weatherData={popularWeather} unit={unit} />
      
    </div>
  );
};
