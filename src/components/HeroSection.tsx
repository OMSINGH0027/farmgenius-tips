
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import { farmImages } from '@/assets';

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  
  return (
    <section
      ref={ref}
      className="relative pt-24 pb-24 overflow-hidden bg-gradient-to-b from-secondary/30 to-background"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grain-pattern opacity-[0.03] z-0"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn(
            "transition-all duration-1000 ease-out-soft",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <p className="text-xs font-medium text-primary">AI-Powered Farming Assistant</p>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-balance mb-6 tracking-tight">
              Smarter farming for a 
              <span className="text-primary block mt-1">sustainable future</span>
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-md text-balance leading-relaxed">
              Personalized, data-driven recommendations for small and marginal farmers in India, delivering insights to enhance productivity and sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                Get Started
              </button>
              
              <button className="px-6 py-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { number: '10K+', label: 'Farmers' },
                { number: '25+', label: 'States' },
                { number: '98%', label: 'Accuracy' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={cn(
                    "transition-all duration-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="font-semibold text-2xl text-foreground">{stat.number}</div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-1000 delay-300 ease-out-soft",
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-strong relative border border-white/30">
                <img 
                  src={farmImages.hero} 
                  alt="Indian farmer in field with smartphone" 
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/80 backdrop-blur-sm flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 8a2 2 0 0 1 4 0v4a2 2 0 0 1-4 0v-4z"></path>
                          <path d="M20 12v-3a7 7 0 1 0-14 0v3"></path>
                          <path d="M18 12a2 2 0 0 0-4 0"></path>
                          <path d="M16 16a4 4 0 0 1-8 0v-4"></path>
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Voice-enabled assistance</p>
                    </div>
                    <h3 className="text-xl font-medium">Get recommendations in your language</h3>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 w-40 h-24 glass-card border border-white/30 shadow-medium rounded-lg p-3 animate-float">
                <div className="flex items-center h-full">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-800">
                      <circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2"></path>
                      <path d="M12 21v2"></path>
                      <path d="M4.22 4.22l1.42 1.42"></path>
                      <path d="M18.36 18.36l1.42 1.42"></path>
                      <path d="M1 12h2"></path>
                      <path d="M21 12h2"></path>
                      <path d="M4.22 19.78l1.42-1.42"></path>
                      <path d="M18.36 5.64l1.42-1.42"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-foreground/80">Weather</div>
                    <div className="font-medium text-foreground">Sunny today</div>
                    <div className="text-xs text-foreground/60">32°C</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 w-48 glass-card border border-white/30 shadow-medium rounded-lg p-3 animate-float animation-delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-800">
                      <path d="M7 20h10"></path>
                      <path d="M10 20c5.5-2.5.8-8.4 4.8-12.8a1 1 0 0 0-1.4-1.4C9.2 9.2 3 4.6.5 10M2 15l3.5 2 2-3.5"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-foreground/80">Soil Health</div>
                    <div className="font-medium text-foreground">Good condition</div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-foreground/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground/70">Nitrogen</span>
                    <div className="w-24 h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
