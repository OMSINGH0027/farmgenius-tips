
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { cn } from '@/lib/utils';

interface MarkerPosition {
  lat: number;
  lng: number;
}

interface GoogleMapViewProps {
  className?: string;
  apiKey: string;
  center?: MarkerPosition;
  zoom?: number;
  markerPositions?: MarkerPosition[];
  height?: string;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({ 
  className, 
  apiKey,
  center = { lat: 20.5937, lng: 78.9629 }, // Default to India's center
  zoom = 5,
  markerPositions = [],
  height = "400px"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is required");
      return;
    }

    // Load Google Maps API
    const loader = new Loader({
      apiKey,
      version: "weekly"
    });

    loader.load()
      .then(() => {
        // API has loaded successfully
        setMapLoaded(true);
        
        if (mapRef.current && window.google) {
          // Initialize the map
          const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeId: 'satellite', // Satellite view is better for agricultural use
            mapTypeControl: true,
            fullscreenControl: true,
          });

          // Add markers if any
          markerPositions.forEach(position => {
            new window.google.maps.Marker({
              position,
              map,
              animation: window.google.maps.Animation.DROP
            });
          });
        }
      })
      .catch(err => {
        console.error("Failed to load Google Maps", err);
        setError("Failed to load Google Maps. Please check your API key.");
      });
  }, [apiKey, center, zoom, markerPositions]);

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center h-full flex items-center justify-center">
          <p>{error}</p>
        </div>
      ) : !mapLoaded ? (
        <div className="bg-foreground/5 h-full flex items-center justify-center">
          <div className="animate-pulse">Loading map...</div>
        </div>
      ) : (
        <div ref={mapRef} style={{ height, width: '100%' }} />
      )}
    </div>
  );
};
