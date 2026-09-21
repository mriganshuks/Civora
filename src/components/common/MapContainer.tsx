/**
 * CIVORA MapContainer Component
 * Interactive GIS & Ward spatial boundary visualization shell.
 */

import React, { useState } from 'react';
import { MapPin, Layers, Navigation, Info, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { GeoLocation } from '../../types';

interface MapPinItem {
  id: string;
  title: string;
  type: 'project' | 'complaint' | 'cluster';
  location: GeoLocation;
  status: string;
}

interface MapContainerProps {
  pins?: MapPinItem[];
  centerLocation?: GeoLocation;
  wardName?: string;
  className?: string;
  id?: string;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  pins = [
    {
      id: 'PRJ-PB-LDH-W24-00041',
      title: 'Road Resurfacing — Ward 24',
      type: 'project',
      location: {
        latitude: 30.8924,
        longitude: 75.8341,
        address: 'Main Market Road, Model Town, Ludhiana',
        ward: 'Ward 24',
        zone: 'Zone D',
        city: 'Ludhiana',
        state: 'Punjab',
        pincode: '141002',
      },
      status: 'in_execution',
    },
  ],
  wardName = 'Ward 24 (Model Town, Ludhiana)',
  className = '',
  id,
}) => {
  const [selectedPin, setSelectedPin] = useState<MapPinItem | null>(pins[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  return (
    <div
      id={id}
      className={`bg-slate-900 rounded-xl border border-slate-700/80 shadow-xs overflow-hidden relative ${className}`}
    >
      {/* Map Header Toolbar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200">
        <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
        <span className="font-semibold">{wardName}</span>
        <span className="text-slate-500 font-mono text-[11px]">GIS Layer 1.4</span>
      </div>

      {/* Map Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 text-white rounded-lg border border-slate-700 shadow-xs cursor-pointer transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 1, 10))}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 text-white rounded-lg border border-slate-700 shadow-xs cursor-pointer transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Styled GIS Canvas Grid Representation */}
      <div className="w-full h-80 bg-radial from-slate-800 to-slate-950 relative overflow-hidden flex items-center justify-center select-none">
        {/* Subtle coordinate grid lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#60a5fa 1px, transparent 1px), radial-gradient(#334155 1px, #020617 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />

        {/* Ward Boundary Polygon Outline */}
        <svg className="absolute inset-0 w-full h-full text-blue-500/20" viewBox="0 0 400 300" preserveAspectRatio="none">
          <polygon
            points="60,40 320,50 360,220 280,260 90,240 40,140"
            fill="rgba(37, 99, 235, 0.08)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="2"
            strokeDasharray="6 3"
          />
          {/* Main Corridor Road Line */}
          <path
            d="M 90,140 Q 200,160 310,130"
            stroke="#60a5fa"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Pins representation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {pins.map((pin, idx) => (
            <div
              key={pin.id || idx}
              className="relative pointer-events-auto cursor-pointer"
              onClick={() => setSelectedPin(pin)}
            >
              {/* Pulse ripple */}
              <span className="absolute -inset-2 rounded-full bg-blue-500/30 animate-ping" />
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white shadow-lg border-2 border-white text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{pin.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Pin Details Overlay */}
      {selectedPin && (
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white truncate">{selectedPin.title}</span>
            <span className="font-mono text-[11px] text-slate-400">
              ({selectedPin.location.latitude.toFixed(4)}° N, {selectedPin.location.longitude.toFixed(4)}° E)
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800 shrink-0">
            {selectedPin.status.replace('_', ' ')}
          </span>
        </div>
      )}
    </div>
  );
};
