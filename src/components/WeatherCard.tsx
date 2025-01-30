import React from 'react';
import { FaWind } from "react-icons/fa";
import { FaDroplet} from "react-icons/fa6";
import { FaThermometerHalf } from "react-icons/fa";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  icon: string;
  unit: 'metric' | 'imperial';
  onUnitToggle: () => void;
}

export const WeatherCard = ({
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img src={icon} alt={condition} className="w-16 h-16" />
          <div>
            <div className="flex items-center space-x-2">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {temperature}°{unit === 'metric' ? 'C' : 'F'}
              </div>
              <button
                onClick={onUnitToggle}
                className="flex items-center space-x-1 px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <FaThermometerHalf className="w-4 h-4" />
                <span>Switch to °{unit === 'metric' ? 'F' : 'C'}</span>
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 capitalize">{condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <FaDroplet className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaWind className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {windSpeed} {unit === 'metric' ? 'km/h' : 'mph'}
                <span className="block text-sm text-gray-500 dark:text-gray-400">from {windDirection}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};