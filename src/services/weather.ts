import { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Define API response type
interface OpenWeatherResponse {
  name: string;
  main: { temp: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  sys: { sunrise: number; sunset: number };
}
// Fetches weather data for a given city
// throws An error if the API key is missing or if the fetch request fails
export async function getWeatherByCity(city: string, unit: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
  if (!API_KEY) {
    console.error("API Key is missing. Check your .env file!");
    throw new Error("API Key is missing");
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch weather data");
  }

  const data: OpenWeatherResponse = await response.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    windDirection: getWindDirection(data.wind.deg),
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    uv: 3,
    unit
  };
}

// Converts wind degrees into readable directions
function getWindDirection(degrees: number): string {
  const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
  return directions[Math.round(degrees / 45) % 8];
}