
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Define form schema with validations
const formSchema = z.object({
  landArea: z.string().min(1, "Land area is required"),
  soilType: z.string().min(1, "Soil type is required"),
  farmingScale: z.string().min(1, "Farming scale is required"),
  cropSeason: z.string().min(1, "Crop season is required"),
  budget: z.string().min(1, "Budget is required"),
  currentCrops: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CustomFarmPlanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomFarmPlanForm = ({ open, onOpenChange }: CustomFarmPlanFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landArea: "",
      soilType: "",
      farmingScale: "small",
      cropSeason: "kharif",
      budget: "",
      currentCrops: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call to generate plan with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI-generated farm plan
      const mockPlan = {
        recommendations: {
          crops: ["Rice", "Green Gram", "Black Gram"],
          schedule: {
            preparation: "May 15 - June 5",
            planting: "June 10 - June 30",
            harvesting: "September 15 - October 10"
          },
          resources: {
            seeds: "Rice (20 kg/ha), Green Gram (15 kg/ha)",
            fertilizers: "Organic compost (2 tonnes/ha), NPK 15:15:15 (100 kg/ha)",
            irrigation: "System: Drip irrigation, Frequency: Every 3-4 days depending on rainfall"
          },
          riskManagement: [
            "Consider crop insurance for protection against extreme weather events",
            "Maintain disease surveillance during humid periods",
            "Implement drainage solutions before monsoon season begins"
          ]
        }
      };
      
      setGeneratedPlan(mockPlan);
      toast.success("Custom farm plan generated successfully!");
    } catch (error) {
      console.error("Error generating farm plan:", error);
      toast.error("Failed to generate farm plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setGeneratedPlan(null);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        resetForm();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Custom Farm Plan</DialogTitle>
          <DialogDescription>
            Enter your farm details to receive AI-powered recommendations tailored to your specific needs.
          </DialogDescription>
        </DialogHeader>

        {!generatedPlan ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="landArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Area (hectares/acres)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="silt">Silt</SelectItem>
                          <SelectItem value="sand">Sandy</SelectItem>
                          <SelectItem value="loam">Loam</SelectItem>
                          <SelectItem value="clayLoam">Clay Loam</SelectItem>
                          <SelectItem value="sandyLoam">Sandy Loam</SelectItem>
                          <SelectItem value="siltLoam">Silt Loam</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="farmingScale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farming Scale</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select scale" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (0-2 hectares)</SelectItem>
                          <SelectItem value="medium">Medium (2-10 hectares)</SelectItem>
                          <SelectItem value="large">Large (10+ hectares)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cropSeason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Season</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                          <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                          <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                          <SelectItem value="yearRound">Year-round</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Budget (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 25000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Approximate budget for the growing season
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentCrops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current/Previous Crops</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rice, Wheat, Vegetables" {...field} />
                    </FormControl>
                    <FormDescription>
                      List crops currently or previously grown on this land
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific concerns, challenges, or goals?" 
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Plan...
                    </>
                  ) : "Generate Farm Plan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-3">Recommended Crops</h3>
              <div className="flex flex-wrap gap-2">
                {generatedPlan.recommendations.crops.map((crop: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Planting Schedule</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Preparation:</span>
                  <span>{generatedPlan.recommendations.schedule.preparation}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Planting:</span>
                  <span>{generatedPlan.recommendations.schedule.planting}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Harvesting:</span>
                  <span>{generatedPlan.recommendations.schedule.harvesting}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Resource Allocation</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Seeds:</span>
                  <span>{generatedPlan.recommendations.resources.seeds}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Fertilizers:</span>
                  <span>{generatedPlan.recommendations.resources.fertilizers}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="font-medium min-w-[120px]">Irrigation:</span>
                  <span>{generatedPlan.recommendations.resources.irrigation}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Risk Management</h3>
              <ul className="space-y-2">
                {generatedPlan.recommendations.riskManagement.map((risk: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70 mt-0.5 shrink-0">
                      <path d="M12 17.8L5.8 21 7 14.1 2 9.3l7-1L12 3l3 5.3 7 1-5 4.8 1.2 6.9z"></path>
                    </svg>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={resetForm}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Start Over
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                Save Plan
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
