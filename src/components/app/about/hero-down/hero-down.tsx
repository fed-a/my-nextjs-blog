'use client';

import React from 'react';

import './hero-down.css';

interface HeroDownProps {
  label: string;
}

export function HeroDown({ label }: HeroDownProps) {
  return (
    <button className="block hover:scale-110 pr-4 pt-4 transition-transform">
      <div className="landing__down">{label}</div>
    </button>
  );
}
