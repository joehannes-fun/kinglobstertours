import React from 'react';

interface SeaWaveDividerProps {
  variant?: 'crest' | 'swell' | 'tide' | 'foam';
  colorClass?: string;
  className?: string;
  flip?: boolean;
}

export const SeaWaveDivider: React.FC<SeaWaveDividerProps> = ({
  variant = 'crest',
  colorClass = 'text-[#061d2b]/15',
  className = '',
  flip = false,
}) => {
  const transformClass = flip ? 'rotate-180' : '';

  if (variant === 'swell') {
    return (
      <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
        <svg
          className={`relative block w-full h-10 sm:h-14 md:h-18 lg:h-24 ${colorClass} ${transformClass}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 550,60 C750,150 950,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'tide') {
    return (
      <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
        <svg
          className={`relative block w-full h-8 sm:h-12 md:h-16 ${colorClass} ${transformClass}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 Q300,100 600,20 T1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'foam') {
    return (
      <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
        <svg
          className={`relative block w-full h-12 sm:h-16 md:h-20 ${colorClass} ${transformClass}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C200,110 450,10 700,70 C950,130 1100,20 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  // Default 'crest' wave pattern
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        className={`relative block w-full h-10 sm:h-14 md:h-16 lg:h-20 ${colorClass} ${transformClass}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C300,90 600,10 900,80 C1050,115 1150,55 1200,30 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default SeaWaveDivider;
