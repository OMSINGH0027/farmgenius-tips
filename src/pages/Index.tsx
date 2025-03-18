
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WeatherModule } from "@/components/WeatherModule";
import { SoilAnalysis } from "@/components/SoilAnalysis";
import { CropRecommendations } from "@/components/CropRecommendations";
import { CustomFarmPlanForm } from "@/components/CustomFarmPlanForm";
import { FarmMapSection } from "@/components/FarmMapSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WeatherModule />
        <SoilAnalysis />
        <CropRecommendations />
        <FarmMapSection />
      </main>
      
      <dialog id="customFarmPlan" className="modal p-0 rounded-2xl shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm">
        <div className="modal-box p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-background">
          <h2 className="text-2xl font-semibold mb-6">Create Your Custom Farm Plan</h2>
          <CustomFarmPlanForm />
          <button 
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-foreground/5"
            onClick={() => document.getElementById('customFarmPlan').close()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </dialog>
      
      <footer className="py-12 bg-foreground/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M21 12a9 9 0 0 0-9-9" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">FarmGenius</h3>
            <p className="text-sm text-foreground/70 max-w-md mb-6">
              Empowering farmers with AI-driven insights for better agricultural decisions.
            </p>
            
            <div className="flex space-x-4 mb-8">
              {["Terms", "Privacy", "Support", "Contact"].map((item, i) => (
                <a 
                  key={i}
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <p className="text-xs text-foreground/60">
              © {new Date().getFullYear()} FarmGenius. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
