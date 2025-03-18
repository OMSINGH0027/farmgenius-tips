import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { AnimatedCard } from './AnimatedCard';
import { weatherIcons, farmImages } from '@/assets';

// Mock data for weather
const weatherData = {
  location: "Pune, Maharashtra",
  current: {
    temp: 32,
    condition: "Sunny",
    humidity: 40,
    wind: 10,
    icon: weatherIcons.sunny
  },
  forecast: [
    { day: "Mon", temp: 32, tempMin: 24, icon: weatherIcons.sunny },
    { day: "Tue", temp: 30, tempMin: 23, icon: weatherIcons.cloudy },
    { day: "Wed", temp: 29, tempMin: 22, icon: weatherIcons.rainy },
    { day: "Thu", temp: 31, tempMin: 25, icon: weatherIcons.sunny },
    { day: "Fri", temp: 33, tempMin: 26, icon: weatherIcons.sunny }
  ],
  alerts: [
    { type: "Rain", message: "Heavy rainfall expected in the coming week", severity: "moderate" }
  ]
};

export const WeatherModule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      id="weather"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-semibold tracking-tight transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Real-time Weather Insights
          </h2>
          <p className={cn(
            "mt-4 text-foreground/80 max-w-2xl text-balance transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "100ms" }}>
            Get accurate weather forecasts and alerts specifically for your farm location to plan your agricultural activities efficiently.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main weather card */}
            <div className="lg:col-span-2">
              <AnimatedCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{weatherData.location}</h3>
                      <p className="text-sm text-foreground/60">Updated just now</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">Live</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center mt-6 gap-6">
                    <img 
                      src={weatherData.current.icon} 
                      alt={weatherData.current.condition} 
                      className="w-20 h-20"
                    />
                    
                    <div>
                      <div className="flex items-end">
                        <span className="text-5xl font-medium">{weatherData.current.temp}</span>
                        <span className="text-xl ml-1 mb-1">°C</span>
                      </div>
                      <p className="text-foreground/70">{weatherData.current.condition}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-auto">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70 mr-2">
                          <path d="M12 17.8L5.8 21 7 14.1 2 9.3l7-1L12 3l3 5.3 7 1-5 4.8 1.2 6.9z"></path>
                        </svg>
                        <span className="text-sm text-foreground/70">Humidity: {weatherData.current.humidity}%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70 mr-2">
                          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                          <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                          <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                        </svg>
                        <span className="text-sm text-foreground/70">Wind: {weatherData.current.wind} km/h</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-5 gap-2">
                    {weatherData.forecast.map((day, i) => (
                      <div key={i} className="flex flex-col items-center p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                        <span className="text-sm font-medium">{day.day}</span>
                        <img src={day.icon} alt="weather icon" className="w-10 h-10 my-2" />
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-medium">{day.temp}°</span>
                          <span className="text-foreground/60">{day.tempMin}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <button className="w-full py-2.5 text-sm font-medium rounded-lg border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                      View Detailed Forecast
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            </div>
            
            {/* Weather alert and recommendation */}
            <div className="flex flex-col gap-6">
              <AnimatedCard index={1} className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-700/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium">Weather Alert</h3>
                </div>
                
                {weatherData.alerts.map((alert, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{alert.type}</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-400 text-xs">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">{alert.message}</p>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800/30">
                  <h4 className="font-medium text-sm mb-2">Recommended Actions:</h4>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-red-600 dark:text-red-400">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>Prepare drainage for excess water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-red-600 dark:text-red-400">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span>Delay pesticide application</span>
                    </li>
                  </ul>
                </div>
              </AnimatedCard>
              
              <AnimatedCard index={2} className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src={farmImages.weather} 
                    alt="Farmland with weather station" 
                    className="w-full h-full object-cover opacity-10"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="font-medium mb-3">Farming Activity Index</h3>
                  
                  <div className="space-y-4">
                    {[
                      { activity: "Planting", score: 70 },
                      { activity: "Irrigation", score: 30 },
                      { activity: "Harvesting", score: 90 }
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.activity}</span>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                        <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              item.score > 70 ? "bg-green-500" : 
                              item.score > 40 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-6 w-full py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                    Plan Your Week
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
