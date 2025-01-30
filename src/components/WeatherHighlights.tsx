
interface WeatherHighlight {
  type: "UV" | "Sunrise" | "Sunset";
  value: string;
  icon: string;
  image?: string; // Optional image field
}

interface WeatherHighlightsProps {
  highlights: WeatherHighlight[];
}

export const WeatherHighlights = ({ highlights }: WeatherHighlightsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Highlights</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <div
            key={`${highlight.type}-${index}`} // Ensure unique keys
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase">
                {highlight.type}
              </span>
              <img src={highlight.icon} alt={`${highlight.type} icon`} className="w-12 h-12" />
            </div>

            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {highlight.value}
            </p>

            {highlight.image && (
              <img
                src={highlight.image}
                alt={`${highlight.type} representation`}
                className="mt-3 w-full h-16 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
