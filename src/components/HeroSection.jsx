
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { farmImages } from '@/assets';

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section 
      ref={ref}
      className="pt-32 pb-20 min-h-[90vh] flex items-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 z-10"></div>
        <img 
          src={farmImages.farmer} 
          alt="Farmer in field" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={cn(
              "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              Intelligent Farming for a <span className="text-primary">Sustainable Future</span>
            </h1>
            
            <p className={cn(
              "mt-6 text-lg text-foreground/80 max-w-xl transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}>
              Empowering farmers with AI-driven insights to optimize crop yields, reduce costs, and build climate resilience.
            </p>
            
            <div className={cn(
              "mt-8 flex flex-wrap gap-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "200ms" }}>
              <button className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-xl border border-border hover:bg-primary/5 hover:border-primary/30 transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>
          
          <div className={cn(
            "relative transition-all duration-1000 transform",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <div className="relative z-10 p-3 rounded-2xl glass-card border-primary/20">
              <img 
                src="https://placehold.co/600x400/green/white?text=Farm+Analytics" 
                alt="Farm analytics dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
