import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaThermometerHalf, FaWind, FaSun, FaSearch } from 'react-icons/fa';
import { FaDroplet } from 'react-icons/fa6';
import type { WeatherData } from '../types/weather';

interface WeatherFeaturesProps {
  weatherData: WeatherData[];
  unit: 'metric' | 'imperial';
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  getValue: (data: WeatherData) => string | number;
  unit?: string;
}

export const WeatherFeatures = ({ weatherData, unit }: WeatherFeaturesProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const features: Feature[] = [
    {
      title: 'Real-Time Temperature',
      description: 'Get accurate temperature readings for any city worldwide',
      icon: <FaThermometerHalf className="w-6 h-6 text-orange-500" />,
      getValue: (data) => data.temperature,
      unit: unit === 'metric' ? '°C' : '°F'
    },
    {
      title: 'Wind Conditions',
      description: 'Track wind speed and direction for better planning',
      icon: <FaWind className="w-6 h-6 text-blue-500" />,
      getValue: (data) => data.windSpeed,
      unit: unit === 'metric' ? 'km/h' : 'mph'
    },
    {
      title: 'Humidity Levels',
      description: 'Monitor air moisture levels throughout the day',
      icon: <FaDroplet className="w-6 h-6 text-cyan-500" />,
      getValue: (data) => data.humidity,
      unit: '%'
    },
    {
      title: 'Sunrise & Sunset',
      description: 'Plan your day with accurate daylight information',
      icon: <FaSun className="w-6 h-6 text-yellow-500" />,
      getValue: (data) => data.sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      title: 'Instant Search',
      description: 'Find weather information for any city as you type',
      icon: <FaSearch className="w-6 h-6 text-indigo-500" />,
      getValue: () => ''
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [features.length, isMobile]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  }, [features.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  }, [features.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg md:rounded-2xl shadow-sm p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 px-2">
        Weather App Features
      </h2>

      <div 
        className="relative touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xs">
                  {feature.description}
                </p>
                {weatherData.length > 0 && feature.getValue(weatherData[0]) && (
                  <div className="text-lg md:text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {feature.getValue(weatherData[0])}
                    {feature.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons - Only visible on desktop */}
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Slide indicators - Optimized for mobile */}
      <div className="flex justify-center space-x-2 mt-4 md:mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide
                ? 'bg-blue-500 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};