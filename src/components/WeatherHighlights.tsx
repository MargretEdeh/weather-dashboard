
interface WeatherHighlight {
  type: 'UV' | 'Sunrise' | 'Sunset';
  value: string;
  icon: string;
}

interface WeatherHighlightsProps {
  highlights: WeatherHighlight[];
}

export const WeatherHighlights = ({ highlights }: WeatherHighlightsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Highlights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {highlights.map((highlight) => (
          <div 
            key={highlight.type}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 dark:text-gray-400">{highlight.type}</span>
              <img src={highlight.icon} alt={highlight.type} className="w-12 h-12" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {highlight.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};