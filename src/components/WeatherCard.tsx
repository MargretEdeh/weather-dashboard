import { FaWind, FaThermometerHalf } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";


//   Props interface for the WeatherCard component.
interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  icon: string;
  unit: "metric" | "imperial";
  onUnitToggle: () => void;
}

// WeatherCard Component
//  Displays weather details for a given city, including temperature, condition, humidity, wind speed, and direction. 
//  Users can toggle between metric and imperial units.
 
export const WeatherCard = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  windDirection,
  icon,
  unit,
  onUnitToggle,
}: WeatherCardProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800/50 rounded-3xl border-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer backdrop-blur-xl p-6">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">{city}</CardTitle>
            <CardDescription className="capitalize text-gray-600 dark:text-gray-300">{condition}</CardDescription>
          </div>
          <img src={icon} alt={condition} className="w-14 h-14 rounded-xl shadow-md bg-gray-100 dark:bg-gray-700 p-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Temperature & Unit Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            {temperature}°{unit === "metric" ? "C" : "F"}
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-950/80 border-0 rounded-full transition-all duration-200"
            onClick={onUnitToggle}
          >
            <FaThermometerHalf className="w-5 h-5" />
            <span>Switch to °{unit === "metric" ? "F" : "C"}</span>
          </Button>
        </div>

        {/* Weather Details */}
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FaDroplet className="text-blue-500 w-5 h-5" />
            <span className="font-medium">{humidity}% Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <FaWind className="text-blue-500 w-5 h-5" />
            <div className="leading-tight">
              <span className="font-medium">{windSpeed} {unit === "metric" ? "km/h" : "mph"}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">From {windDirection}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
