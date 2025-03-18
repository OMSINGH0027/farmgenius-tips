
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Mock data
const soilTypes = ["Loamy", "Sandy", "Clay", "Silt", "Peaty", "Chalky", "Black"];
const seasons = ["Kharif", "Rabi", "Zaid"];
const farmingScales = ["Small (<2 acres)", "Medium (2-10 acres)", "Large (>10 acres)"];
const currentCrops = ["Rice", "Wheat", "Cotton", "Maize", "Sugarcane", "Pulses", "Vegetables", "Fruits"];

export const CustomFarmPlanForm = () => {
  const [formData, setFormData] = useState({
    landArea: "",
    soilType: "",
    season: "",
    farmingScale: "",
    budget: "",
    currentCrops: [],
    weatherConditions: "",
    additionalInfo: "",
  });
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [plan, setPlan] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCropSelection = (crop) => {
    setFormData(prev => {
      const currentSelection = [...prev.currentCrops];
      if (currentSelection.includes(crop)) {
        return { ...prev, currentCrops: currentSelection.filter(c => c !== crop) };
      } else {
        return { ...prev, currentCrops: [...currentSelection, crop] };
      }
    });
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  const generatePlan = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response
      const mockPlan = {
        recommendedCrops: ["Wheat", "Mustard", "Chickpea"],
        plantingSchedule: {
          preparation: "Week 1-2: Soil preparation and bed formation",
          planting: "Week 3: Sowing of wheat and mustard seeds",
          maintenance: "Week 4-12: Regular irrigation and weed management",
          harvest: "Week 16-18: Harvesting of mature crops"
        },
        resourceAllocation: {
          seeds: "Wheat: 50kg/acre, Mustard: 2kg/acre, Chickpea: 30kg/acre",
          fertilizers: "NPK (10-26-26): 100kg/acre, Urea: 80kg/acre",
          irrigation: "4-5 irrigations at critical growth stages"
        },
        riskManagement: [
          "Implement intercropping to reduce pest infestation",
          "Prepare drainage channels to prevent waterlogging",
          "Consider crop insurance to mitigate climate risks",
          "Maintain 10% of budget as contingency fund"
        ],
        expectedYield: "Wheat: 18-20 quintals/acre, Mustard: 8-10 quintals/acre, Chickpea: 10-12 quintals/acre",
        marketOutlook: "Strong demand expected for wheat and pulses with potential 5-10% price increase by harvest season"
      };
      
      setPlan(mockPlan);
      setIsLoading(false);
      setPlanGenerated(true);
    }, 2000);
  };
  
  const resetForm = () => {
    setFormData({
      landArea: "",
      soilType: "",
      season: "",
      farmingScale: "",
      budget: "",
      currentCrops: [],
      weatherConditions: "",
      additionalInfo: "",
    });
    setStep(1);
    setPlanGenerated(false);
    setPlan(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!planGenerated ? (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Step {step} of 3</h3>
              <span className="text-sm text-foreground/70">Farm Profile Setup</span>
            </div>
            <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Land Area (acres)</label>
                  <input
                    type="number"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Soil Type</label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select soil type</option>
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Season</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select season</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Farming Scale</label>
                  <select
                    name="farmingScale"
                    value={formData.farmingScale}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select farming scale</option>
                    {farmingScales.map(scale => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current/Previous Crops</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentCrops.map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => handleCropSelection(crop)}
                      className={cn(
                        "py-2 px-3 text-sm border rounded-lg transition-colors",
                        formData.currentCrops.includes(crop)
                          ? "bg-primary/10 border-primary/50 text-primary"
                          : "bg-foreground/5 border-border hover:bg-foreground/10"
                      )}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Budget (₹)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g. 50000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Weather Conditions</label>
                <input
                  type="text"
                  name="weatherConditions"
                  value={formData.weatherConditions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g. Moderate rainfall expected"
                />
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Any specific requirements or challenges..."
                ></textarea>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">What happens next?</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Our AI will analyze your farm data and generate a personalized farming plan with crop recommendations, 
                  planting schedule, resource allocation guidance, and risk management strategies.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-foreground/5 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={generatePlan}
                disabled={isLoading}
                className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Plan...
                  </>
                ) : "Generate Farm Plan"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium">Your Custom Farm Plan</h3>
            <p className="text-foreground/70 mt-2">Based on your specific farm conditions and requirements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-foreground/5 p-5 rounded-xl">
              <h4 className="text-primary font-medium mb-3">Recommended Crops</h4>
              <div className="flex flex-wrap gap-2">
                {plan.recommendedCrops.map(crop => (
                  <span key={crop} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{crop}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-foreground/5 p-5 rounded-xl">
              <h4 className="text-primary font-medium mb-3">Expected Yield</h4>
              <p className="text-sm">{plan.expectedYield}</p>
            </div>
            
            <div className="bg-foreground/5 p-5 rounded-xl md:col-span-2">
              <h4 className="text-primary font-medium mb-3">Planting Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  <div>
                    <span className="font-medium">Preparation:</span> {plan.plantingSchedule.preparation}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                  <div>
                    <span className="font-medium">Planting:</span> {plan.plantingSchedule.planting}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
                  <div>
                    <span className="font-medium">Maintenance:</span> {plan.plantingSchedule.maintenance}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                  <div>
                    <span className="font-medium">Harvest:</span> {plan.plantingSchedule.harvest}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-foreground/5 p-5 rounded-xl">
              <h4 className="text-primary font-medium mb-3">Resource Allocation</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium block">Seeds:</span>
                  <span className="text-foreground/80">{plan.resourceAllocation.seeds}</span>
                </div>
                <div>
                  <span className="font-medium block">Fertilizers:</span>
                  <span className="text-foreground/80">{plan.resourceAllocation.fertilizers}</span>
                </div>
                <div>
                  <span className="font-medium block">Irrigation:</span>
                  <span className="text-foreground/80">{plan.resourceAllocation.irrigation}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-foreground/5 p-5 rounded-xl">
              <h4 className="text-primary font-medium mb-3">Risk Management</h4>
              <ul className="space-y-2 text-sm">
                {plan.riskManagement.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl md:col-span-2">
              <h4 className="text-primary font-medium mb-3">Market Outlook</h4>
              <p className="text-sm">{plan.marketOutlook}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-foreground/5 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print Plan
            </button>
            
            <button 
              onClick={resetForm}
              className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create New Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
