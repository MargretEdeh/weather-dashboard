export interface WeatherData {
    city: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    sunrise: Date;
    sunset: Date;
    uv: number;
    icon: string;
    unit: 'metric' | 'imperial';
  }
  
  export interface WeatherError {
    message: string;
  }