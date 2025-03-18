
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { AnimatedCard } from './AnimatedCard';
import { cropIcons, farmImages } from '@/assets';

// Mock data for crop recommendations
const cropRecommendations = [
  {
    name: "Rice (Paddy)",
    suitability: 95,
    icon: cropIcons.rice,
    waterNeeds: "High",
    soilType: "Clay/Loamy",
    seedingMonth: "June-July",
    harvestMonth: "November",
    estimatedYield: "4-5 tons/ha"
  },
  {
    name: "Wheat",
    suitability: 88,
    icon: cropIcons.wheat,
    waterNeeds: "Medium",
    soilType: "Loamy/Sandy",
    seedingMonth: "October-November",
    harvestMonth: "March-April",
    estimatedYield: "3-4 tons/ha"
  },
  {
    name: "Maize (Corn)",
    suitability: 76,
    icon: cropIcons.corn,
    waterNeeds: "Medium",
    soilType: "Sandy Loam",
    seedingMonth: "June-July",
    harvestMonth: "September-October",
    estimatedYield: "2.5-3.5 tons/ha"
  },
  {
    name: "Vegetables (Mixed)",
    suitability: 68,
    icon: cropIcons.vegetables,
    waterNeeds: "Medium-High",
    soilType: "Loamy",
    seedingMonth: "Year-round",
    harvestMonth: "Varies",
    estimatedYield: "Varies by crop"
  }
];

const marketTrends = [
  { crop: "Rice", price: "₹2,040/quintal", trend: "up", change: "+3.5%" },
  { crop: "Wheat", price: "₹2,125/quintal", trend: "up", change: "+2.1%" },
  { crop: "Maize", price: "₹1,950/quintal", trend: "down", change: "-1.4%" },
  { crop: "Soybeans", price: "₹3,800/quintal", trend: "up", change: "+5.2%" }
];

export const CropRecommendations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  return (
    <section
      id="crops"
      ref={ref}
      className="py-20 bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-semibold tracking-tight transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Smart Crop Recommendations
          </h2>
          <p className={cn(
            "mt-4 text-foreground/80 max-w-2xl text-balance transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "100ms" }}>
            Get AI-powered crop recommendations based on your soil health, weather conditions, and market trends.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Crop cards */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cropRecommendations.map((crop, index) => (
                <AnimatedCard key={index} index={index} className="group h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <img src={crop.icon} alt={crop.name} className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="font-medium">{crop.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="w-16 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${crop.suitability}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-foreground/70 ml-2">{crop.suitability}% match</span>
                          </div>
                        </div>
                      </div>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40 group-hover:text-primary transition-colors">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
                      <div>
                        <span className="text-xs text-foreground/60 block">Water Needs</span>
                        <span className="font-medium">{crop.waterNeeds}</span>
                      </div>
                      <div>
                        <span className="text-xs text-foreground/60 block">Soil Type</span>
                        <span className="font-medium">{crop.soilType}</span>
                      </div>
                      <div>
                        <span className="text-xs text-foreground/60 block">Seeding</span>
                        <span className="font-medium">{crop.seedingMonth}</span>
                      </div>
                      <div>
                        <span className="text-xs text-foreground/60 block">Harvest</span>
                        <span className="font-medium">{crop.harvestMonth}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground/70">Est. Yield:</span>
                        <span className="font-medium">{crop.estimatedYield}</span>
                      </div>
                    </div>
                    
                    <button className="mt-4 w-full py-2 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                      View Farming Guide
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            
            {/* Right column - Market prices and recommendations */}
            <div className="flex flex-col gap-6">
              <AnimatedCard index={0} className="h-full flex flex-col">
                <h3 className="font-medium mb-4">Market Prices</h3>
                
                <div className="space-y-4">
                  {marketTrends.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={cn(
                          "w-2 h-8 rounded-sm mr-3",
                          item.trend === "up" ? "bg-green-500" : "bg-red-500"
                        )}></div>
                        <span>{item.crop}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{item.price}</span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          item.trend === "up" 
                            ? "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400" 
                            : "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-foreground/70 mb-4">
                    Current market trends suggest favorable prices for rice and wheat this season.
                  </p>
                  <button className="w-full py-2.5 text-sm rounded-lg border border-border hover:bg-foreground/5 transition-colors">
                    View All Market Prices
                  </button>
                </div>
              </AnimatedCard>
              
              <AnimatedCard index={1} className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src={farmImages.crops} 
                    alt="Crop field" 
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="font-medium mb-3">Custom Farm Plan</h3>
                  <p className="text-sm text-foreground/80 mb-6">
                    Get a personalized farming plan based on your specific needs and goals.
                  </p>
                  
                  <button className="w-full py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                    Create Custom Plan
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
