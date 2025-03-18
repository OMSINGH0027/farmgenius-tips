import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { AnimatedCard, GlassCard } from './AnimatedCard';
import { farmImages } from '@/assets';

// Mock data for soil analysis
const soilData = {
  overallHealth: "Good",
  healthScore: 78,
  lastUpdated: "2 days ago",
  nutrients: [
    { name: "Nitrogen (N)", value: 45, unit: "kg/ha", status: "Medium" },
    { name: "Phosphorus (P)", value: 32, unit: "kg/ha", status: "Good" },
    { name: "Potassium (K)", value: 65, unit: "kg/ha", status: "Good" },
    { name: "Organic Carbon", value: 0.75, unit: "%", status: "Medium" },
    { name: "pH", value: 6.5, unit: "", status: "Optimal" },
  ],
  recommendations: [
    "Apply nitrogen fertilizer to improve soil fertility",
    "Add organic matter to enhance soil structure",
    "Consider crop rotation to balance nutrient usage"
  ]
};

export const SoilAnalysis = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const getStatusColor = (status) => {
    switch (status) {
      case "Low": return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "Medium": return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "Good": return "text-green-500 bg-green-50 dark:bg-green-900/20";
      case "Optimal": return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default: return "text-gray-500 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <section 
      id="soil"
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grain-pattern opacity-[0.03] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-semibold tracking-tight transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Soil Health Analysis
          </h2>
          <p className={cn(
            "mt-4 text-foreground/80 max-w-2xl text-balance transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "100ms" }}>
            Understand your soil's composition and nutrient levels to make informed decisions about fertilization and crop selection.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Main soil health card */}
            <div className="md:col-span-2">
              <AnimatedCard className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium">Soil Health Analysis</h3>
                    <p className="text-sm text-foreground/60">Last updated: {soilData.lastUpdated}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="font-medium">{soilData.overallHealth}</span>
                  </div>
                </div>
                
                <div className="relative mb-8">
                  {/* Soil health meter */}
                  <div className="w-full h-3 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-300 via-green-500 to-green-600 rounded-full"
                      style={{ width: `${soilData.healthScore}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-foreground/60">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>
                  
                  {/* Indicator */}
                  <div 
                    className="absolute bottom-full mb-2 transform -translate-x-1/2"
                    style={{ left: `${soilData.healthScore}%` }}
                  >
                    <div className="bg-primary text-white text-xs font-medium py-1 px-2 rounded shadow-sm">
                      {soilData.healthScore}%
                    </div>
                    <div className="w-2 h-2 bg-primary transform rotate-45 absolute -bottom-1 left-1/2 -ml-1"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-foreground/5 rounded-xl p-5">
                    <h4 className="text-sm font-medium mb-3">Nutrient Balance</h4>
                    <div className="space-y-4">
                      {soilData.nutrients.slice(0, 3).map((nutrient, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm">{nutrient.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{nutrient.value} {nutrient.unit}</span>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              getStatusColor(nutrient.status)
                            )}>
                              {nutrient.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-foreground/5 rounded-xl p-5">
                    <h4 className="text-sm font-medium mb-3">Physical Properties</h4>
                    <div className="space-y-4">
                      {soilData.nutrients.slice(3).map((property, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm">{property.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{property.value} {property.unit}</span>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              getStatusColor(property.status)
                            )}>
                              {property.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-medium">Recommendations</h4>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">View All</button>
                  </div>
                  
                  <ul className="space-y-2">
                    {soilData.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                          <path d="M12 17.8L5.8 21 7 14.1 2 9.3l7-1L12 3l3 5.3 7 1-5 4.8 1.2 6.9z"></path>
                        </svg>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            </div>
            
            {/* Right column - Soil testing and info */}
            <div className="flex flex-col gap-6">
              <AnimatedCard index={1} className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src={farmImages.soil} 
                    alt="Soil sample being tested" 
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="font-medium mb-3">Test Your Soil</h3>
                  <p className="text-sm text-foreground/80 mb-6">
                    Get a detailed analysis of your soil composition with our testing kit.
                  </p>
                  
                  <button className="w-full py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                    Order Soil Test Kit
                  </button>
                </div>
              </AnimatedCard>
              
              <AnimatedCard index={2} className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-green-100 dark:border-green-800/30">
                <h3 className="font-medium mb-3">Soil Quality Insights</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Water Retention</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">Good</span>
                    </div>
                    <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Microbial Activity</span>
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">Excellent</span>
                    </div>
                    <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className="w-11/12 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Erosion Risk</span>
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">Moderate</span>
                    </div>
                    <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
