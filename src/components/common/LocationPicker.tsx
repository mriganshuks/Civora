/**
 * CIVORA Interactive Location Picker
 * Features:
 * - "Use My Current Location" device GPS trigger (browser navigator.geolocation)
 * - Interactive Leaflet Map with draggable marker & click-to-pin
 * - Reverse geocoding via OpenStreetMap Nominatim API (Lat/Lng -> Readable Street Address)
 * - Manual address refinement
 * - Ward boundary detection and coordinate feedback
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  Crosshair,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';
import L from 'leaflet';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  ward: string;
  city: string;
  state: string;
  pincode?: string;
}

interface LocationPickerProps {
  initialLocation?: Partial<LocationData>;
  onLocationChange: (loc: LocationData) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLocation,
  onLocationChange,
}) => {
  // Default to Ludhiana Municipal coordinates (or provided initial)
  const defaultLat = initialLocation?.latitude || 30.9010;
  const defaultLng = initialLocation?.longitude || 75.8573;

  const [latitude, setLatitude] = useState<number>(defaultLat);
  const [longitude, setLongitude] = useState<number>(defaultLng);
  const [address, setAddress] = useState<string>(
    initialLocation?.address || 'Civil Lines, Near Municipal Corporation, Ludhiana'
  );
  const [ward, setWard] = useState<string>(initialLocation?.ward || 'Ward 24');
  const [city, setCity] = useState<string>(initialLocation?.city || 'Ludhiana');
  const [isLocating, setIsLocating] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasDetectedGps, setHasDetectedGps] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Avoid multiple instantiations
    if (!mapInstanceRef.current) {
      // Fix default Leaflet marker icon URLs
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 15,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const marker = L.marker([latitude, longitude], {
        draggable: true,
      }).addTo(map);

      // Drag event
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        handlePositionChange(position.lat, position.lng);
      });

      // Click on map to reposition marker
      map.on('click', (e: L.LeafletMouseEvent) => {
        marker.setLatLng(e.latlng);
        handlePositionChange(e.latlng.lat, e.latlng.lng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    } else {
      mapInstanceRef.current.setView([latitude, longitude], mapInstanceRef.current.getZoom());
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }

    return () => {
      // Cleanup on unmount
    };
  }, [latitude, longitude]);

  // Handle position update from drag or click
  const handlePositionChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setErrorMsg(null);
    reverseGeocode(lat, lng);
  };

  // Reverse Geocoding via OpenStreetMap Nominatim
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const displayAddr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        const detectedCity = data.address?.city || data.address?.town || data.address?.district || 'Ludhiana';
        const detectedWard = data.address?.suburb || data.address?.neighbourhood || 'Ward 24 (Civil)';

        setAddress(displayAddr);
        setCity(detectedCity);
        setWard(detectedWard);

        onLocationChange({
          latitude: lat,
          longitude: lng,
          address: displayAddr,
          ward: detectedWard,
          city: detectedCity,
          state: data.address?.state || 'Punjab',
          pincode: data.address?.postcode,
        });
      }
    } catch (e) {
      console.warn('Geocoding service unavailable, retaining coords:', e);
      const fallbackAddr = `Lat ${lat.toFixed(5)}, Long ${lng.toFixed(5)}`;
      setAddress(fallbackAddr);
      onLocationChange({
        latitude: lat,
        longitude: lng,
        address: fallbackAddr,
        ward: ward,
        city: city,
        state: 'Punjab',
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  // Device Geolocation trigger
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setHasDetectedGps(true);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.2 });
          markerRef.current.setLatLng([lat, lng]);
        }

        reverseGeocode(lat, lng);
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation permission error:', err);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg('Location permission was denied. You can manually drag the pin or click on the map to set your location.');
        } else {
          setErrorMsg('Unable to acquire satellite/cellular GPS fix. Please adjust pin on map.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-3">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <label className="block text-xs font-bold text-slate-900">
            Defect Geo-Tagging &amp; Location Map
          </label>
          <span className="text-[11px] text-slate-500">
            Click map or drag pin to fine-tune exact defect spot
          </span>
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>{isLocating ? 'Acquiring GPS Fix...' : 'Use My Current Location'}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Interactive Map Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-xs">
        <div
          ref={mapContainerRef}
          className="w-full h-64 sm:h-72 z-10"
          style={{ minHeight: '260px' }}
        />

        {/* Floating coordinates badge */}
        <div className="absolute bottom-2 left-2 z-20 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[11px] font-mono text-slate-700 flex items-center gap-2">
          <Crosshair className="w-3 h-3 text-blue-600" />
          <span>
            {latitude.toFixed(6)}° N, {longitude.toFixed(6)}° E
          </span>
          {hasDetectedGps && (
            <span className="text-[10px] text-emerald-700 font-sans font-semibold bg-emerald-50 px-1 rounded">
              GPS Verified
            </span>
          )}
        </div>

        {isGeocoding && (
          <div className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[11px] text-slate-700 flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
            <span>Resolving address...</span>
          </div>
        )}
      </div>

      {/* Resolved Address Display & Manual Refinement */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-semibold text-slate-700">
          Detected Street Address &amp; Landmarks
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              onLocationChange({
                latitude,
                longitude,
                address: e.target.value,
                ward,
                city,
                state: 'Punjab',
              });
            }}
            placeholder="e.g. Near Gurdwara Sahib, Main Road..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>Locality: <strong>{ward}</strong></span>
          <span>Municipal Jurisdiction: <strong>{city}</strong></span>
        </div>
      </div>
    </div>
  );
};
