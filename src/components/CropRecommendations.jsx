
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { AnimatedCard } from './AnimatedCard';
import { cropData } from '@/assets';

export const CropRecommendations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      id="crops"
      ref={ref}
      className="py-20 bg-foreground/[0.02]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className={cn(
            "text-3xl sm:text-4xl font-semibold tracking-tight transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Crop Recommendations
          </h2>
          <p className={cn(
            "mt-4 text-foreground/80 max-w-2xl text-balance transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "100ms" }}>
            Get personalized crop recommendations based on your soil quality, weather patterns, and market trends.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cropData.map((crop, i) => (
              <AnimatedCard 
                key={crop.name} 
                index={i}
                className="h-full flex flex-col"
              >
                <div className="h-36 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-lg font-medium mb-2">{crop.name}</h3>
                
                <div className="space-y-2 text-sm text-foreground/70 flex-grow">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-foreground">{crop.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Season:</span>
                    <span className="font-medium text-foreground">{crop.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Need:</span>
                    <span className="font-medium text-foreground">{crop.waterRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Soil Type:</span>
                    <span className="font-medium text-foreground">{crop.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield:</span>
                    <span className="font-medium text-foreground">{crop.yield}</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2.5 text-sm font-medium rounded-lg border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors">
                  View Details
                </button>
              </AnimatedCard>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center p-1 rounded-xl bg-foreground/5 mb-4">
              <span className="px-3 py-1 text-xs rounded-lg bg-primary text-white">New</span>
              <span className="px-3 py-1 text-xs">AI-Powered Recommendations</span>
            </div>
            
            <h3 className="text-xl font-medium mb-2">Create Custom Farm Plan</h3>
            <p className="text-foreground/70 max-w-lg mx-auto mb-6">
              Get an AI-generated farming plan customized to your specific soil conditions, land area, and budget.
            </p>
            
            <button 
              className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
              onClick={() => document.getElementById('customFarmPlan').showModal()}
            >
              Create Custom Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
