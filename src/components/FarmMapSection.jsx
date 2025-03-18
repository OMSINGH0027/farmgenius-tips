
import React, { useState } from 'react';
import { GoogleMapView } from './GoogleMapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const FarmMapSection = () => {
  const [apiKey, setApiKey] = useState('');
  const [showMapConfig, setShowMapConfig] = useState(true);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [farmLocation, setFarmLocation] = useState({ lat: 20.5937, lng: 78.9629 });
  
  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowMapConfig(false);
      toast.success("Google Maps API key saved");
    } else {
      toast.error("Please enter a valid API key");
    }
  };
  
  const handleSetLocation = (e) => {
    e.preventDefault();
    const form = e.target;
    const lat = parseFloat(form.latitude.value);
    const lng = parseFloat(form.longitude.value);
    
    if (isNaN(lat) || isNaN(lng)) {
      toast.error("Please enter valid coordinates");
      return;
    }
    
    setFarmLocation({ lat, lng });
    setMarkerPositions([...markerPositions, { lat, lng }]);
    form.reset();
    toast.success("Farm location added");
  };
  
  return (
    <section className="py-12 bg-foreground/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Farm Mapping</h2>
            <p className="text-foreground/70">
              Visualize your farm location, plot boundaries, and nearby resources
            </p>
          </div>
          
          {showMapConfig ? (
            <Card>
              <CardHeader>
                <CardTitle>Configure Google Maps</CardTitle>
                <CardDescription>
                  Add your Google Maps API key to enable mapping features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApiKeySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="apiKey" className="text-sm font-medium">
                      Google Maps API Key
                    </label>
                    <Input
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Google Maps API key"
                      required
                    />
                    <p className="text-xs text-foreground/60">
                      You can get an API key from the 
                      <a 
                        href="https://console.cloud.google.com/google/maps-apis/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary mx-1 hover:underline"
                      >
                        Google Cloud Console
                      </a>
                    </p>
                  </div>
                  <Button type="submit">Save API Key</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <GoogleMapView 
                    apiKey={apiKey}
                    center={farmLocation}
                    zoom={14}
                    markerPositions={markerPositions}
                    height="400px"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add Farm Location</CardTitle>
                  <CardDescription>
                    Add coordinates to mark important locations on your farm
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSetLocation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="latitude" className="text-sm font-medium">
                        Latitude
                      </label>
                      <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g. 20.5937"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="longitude" className="text-sm font-medium">
                        Longitude
                      </label>
                      <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g. 78.9629"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Button type="submit" className="w-full">Add Location Marker</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMapConfig(true)}
                >
                  Change API Key
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
