import React from 'react';

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Abstract Mountain Shape */}
      <path 
        d="M50 15L15 85H85L50 15Z" 
        fill="currentColor" 
        className="text-georgianRed"
      />
      {/* Snow cap */}
      <path 
        d="M50 15L38 39L50 32L62 39L50 15Z" 
        fill="white" 
        fillOpacity="0.9"
      />
      {/* Location Dot / Sun */}
      <circle cx="50" cy="65" r="8" fill="white" />
    </svg>
  );
}