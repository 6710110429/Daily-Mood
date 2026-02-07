import React from 'react';
import { MoodType, MoodConfig } from '../types';
import { MOODS } from '../constants';

interface FlowerIconProps {
  mood: MoodType;
  size?: number;
  className?: string;
  animate?: boolean;
}

const FlowerIcon: React.FC<FlowerIconProps> = ({ mood, size = 60, className = '', animate = false }) => {
  const config: MoodConfig = MOODS[mood];

  const getFace = () => {
    switch (mood) {
      case 'radiant':
        return (
          <g transform="translate(50, 50)">
            <circle cx="-12" cy="-5" r="4" fill={config.faceColor} />
            <circle cx="12" cy="-5" r="4" fill={config.faceColor} />
            <path d="M -15 10 Q 0 22 15 10" fill="none" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M -18 5 Q -22 0 -18 -5" fill="none" stroke={config.faceColor} strokeWidth="1.5" opacity="0.4" />
            <path d="M 18 5 Q 22 0 18 -5" fill="none" stroke={config.faceColor} strokeWidth="1.5" opacity="0.4" />
          </g>
        );
      case 'happy':
        return (
          <g transform="translate(50, 50)">
            <circle cx="-12" cy="-5" r="3.5" fill={config.faceColor} />
            <circle cx="12" cy="-5" r="3.5" fill={config.faceColor} />
            <path d="M -12 12 Q 0 20 12 12" fill="none" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'neutral':
        return (
          <g transform="translate(50, 50)">
            <circle cx="-12" cy="-5" r="3" fill={config.faceColor} />
            <circle cx="12" cy="-5" r="3" fill={config.faceColor} />
            <line x1="-10" y1="12" x2="10" y2="12" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'blue':
        return (
          <g transform="translate(50, 50)">
             {/* Sad eyes */}
            <path d="M -16 -2 Q -12 -8 -8 -2" fill="none" stroke={config.faceColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 8 -2 Q 12 -8 16 -2" fill="none" stroke={config.faceColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M -10 18 Q 0 8 10 18" fill="none" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="15" cy="5" r="1.5" fill={config.faceColor} opacity="0.6" /> {/* tear */}
          </g>
        );
      case 'stormy':
        return (
          <g transform="translate(50, 50)">
             {/* Angry brows */}
            <line x1="-16" y1="-8" x2="-6" y2="-2" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="-8" x2="6" y2="-2" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="-11" cy="0" r="3" fill={config.faceColor} />
            <circle cx="11" cy="0" r="3" fill={config.faceColor} />
            <path d="M -10 15 Q 0 8 10 15" fill="none" stroke={config.faceColor} strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`${className} ${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={animate ? "origin-center animate-[spin_10s_linear_infinite]" : ""}>
        {/* Petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="20"
            rx="12"
            ry="20"
            fill={config.petalColor}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      
      {/* Center of the flower */}
      <circle cx="50" cy="50" r="24" fill={config.centerColor} />
      
      {/* Face expression */}
      {getFace()}
    </svg>
  );
};

export default FlowerIcon;