import React from 'react';

export type VoyageCategory = 'water' | 'ritual' | 'deck' | 'competition' | 'keepsake';

export interface VoyageItemConfig {
  id: string;
  category: VoyageCategory;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  badgeEn: string;
  badgeEs: string;
}

export const VOYAGE_ITEMS: VoyageItemConfig[] = [
  {
    id: 'reef-snorkel',
    category: 'water',
    titleEn: 'Coral Reef Snorkel',
    titleEs: 'Snorkel en Arrecife de Coral',
    descEn: 'Guided drift through bioluminescent coral gardens with sea turtles.',
    descEs: 'Navegación guiada por jardines de coral con tortugas marinas.',
    badgeEn: 'Marine Life',
    badgeEs: 'Vida Marina',
  },
  {
    id: 'natural-pool',
    category: 'water',
    titleEn: 'Natural Sandbar Pool',
    titleEs: 'Piscina Natural',
    descEn: 'Waist-deep turquoise waters with floating cocktail bar service.',
    descEs: 'Aguas turquesas a la cintura con servicio de barra flotante.',
    badgeEn: 'Lagoon Paradise',
    badgeEs: 'Paraíso Laguna',
  },
  {
    id: 'dolphin-drift',
    category: 'water',
    titleEn: 'Dolphin Safari Drift',
    titleEs: 'Safari de Delfines',
    descEn: 'Coastal bow wave cruising with wild bottlenose dolphins.',
    descEs: 'Crucero por la costa observando delfines en libertad.',
    badgeEn: 'Wildlife Encounter',
    badgeEs: 'Encuentro Salvaje',
  },
  {
    id: 'floating-bar',
    category: 'water',
    titleEn: 'Floating Tiki Bar',
    titleEs: 'Bar Flotante Tiki',
    descEn: 'Submerged lounges with signature Dominican cocktails.',
    descEs: 'Asientos sumergidos con cócteles caribeños de autor.',
    badgeEn: 'Unlimited Drinks',
    badgeEs: 'Bebidas Ilimitadas',
  },
  {
    id: 'top-deck-jump',
    category: 'water',
    titleEn: 'Top Deck Jump',
    titleEs: 'Salto Desde el Puentes',
    descEn: 'Adrenaline 4-meter splash leap into crystal Caribbean waters.',
    descEs: 'Salto lleno de adrenalina a 4 metros hacia el mar Caribe.',
    badgeEn: 'Thrill Seekers',
    badgeEs: 'Adrenalina',
  },
  {
    id: 'departure-horn',
    category: 'ritual',
    titleEn: 'Conch Horn Ritual',
    titleEs: 'Ritual del Caracol',
    descEn: 'Acoustic conch blast announcing embarkation and ocean blessing.',
    descEs: 'Toque de caracol marino anunciando el embarque y bendición del mar.',
    badgeEn: 'Tradition',
    badgeEs: 'Tradición',
  },
  {
    id: 'golden-hour-toast',
    category: 'ritual',
    titleEn: 'Golden Hour Sunset Toast',
    titleEs: 'Brindis al Atardecer',
    descEn: 'Chilled Mamajuana sparkling toast as the sun hits the horizon.',
    descEs: 'Brindis con Mamajuana helada mientras el sol toca el horizonte.',
    badgeEn: 'Sunset Magic',
    badgeEs: 'Atardecer Mágico',
  },
  {
    id: 'rum-table',
    category: 'ritual',
    titleEn: 'Dominican Rum Tasting',
    titleEs: 'Cata de Ron Dominicano',
    descEn: 'Sommelier guided tasting of aged 12-year Caribbean rums.',
    descEs: 'Cata guiada por sommelier de rones añejos dominicanos.',
    badgeEn: 'Añejo Reserve',
    badgeEs: 'Reserva Añeja',
  },
  {
    id: 'bachata-bootcamp',
    category: 'deck',
    titleEn: 'Deck Bachata Express',
    titleEs: 'Clase de Bachata en Cubierta',
    descEn: '15-minute rhythm masterclass led by local Dominican dancers.',
    descEs: 'Clase rápida de ritmo guiada por bailarines dominicanos.',
    badgeEn: 'Dance & Vibes',
    badgeEs: 'Baile y Sabor',
  },
  {
    id: 'mofongo-masterclass',
    category: 'ritual',
    titleEn: 'Mofongo Cooking Demo',
    titleEs: 'Demostración de Mofongo',
    descEn: 'Traditional pilón plantain crushing demo with chef pairing.',
    descEs: 'Demostración culinaria de pilón de plátano con chef a bordo.',
    badgeEn: 'Dominican Flavor',
    badgeEs: 'Sabor Criollo',
  },
  {
    id: 'foam-drop',
    category: 'deck',
    titleEn: 'Deck Foam Splash',
    titleEs: 'Fiesta de Espuma',
    descEn: 'Biodegradable organic foam burst on the open dance deck.',
    descEs: 'Explosión de espuma orgánica biodegradable en la pista de baile.',
    badgeEn: 'Party Explosion',
    badgeEs: 'Fiesta Total',
  },
  {
    id: 'silent-disco',
    category: 'deck',
    titleEn: 'Dual-Channel Silent Disco',
    titleEs: 'Discoteca Silenciosa',
    descEn: 'Wireless multi-channel glowing headphones: Dembow vs. Tropical House.',
    descEs: 'Audífonos inalámbricos de doble canal: Dembow vs. House Tropical.',
    badgeEn: 'Audio Immersive',
    badgeEs: 'Audio Inmersivo',
  },
  {
    id: 'reef-bingo',
    category: 'competition',
    titleEn: 'Marine Wildlife Bingo',
    titleEs: 'Bingo de Vida Marina',
    descEn: 'Spot stingrays, parrotfish, and sea stars for VIP rum prizes.',
    descEs: 'Avista mantarrayas y peces tropicales para ganar premios de ron.',
    badgeEn: 'Interactive Challenge',
    badgeEs: 'Desafío Interactivo',
  },
  {
    id: 'sandbar-games',
    category: 'competition',
    titleEn: 'Lagoon Limbo Contest',
    titleEs: 'Concurso de Limbo en la Laguna',
    descEn: 'Waist-deep oar limbo match under sunny Caribbean skies.',
    descEs: 'Competencia de limbo con remo en la laguna con agua a la cintura.',
    badgeEn: 'Fun Competition',
    badgeEs: 'Competencia Divertida',
  },
  {
    id: 'dance-off',
    category: 'competition',
    titleEn: 'Merengue Dance Off',
    titleEs: 'Duelo de Merengue',
    descEn: 'High-energy deck showdown to win an official souvenir hat.',
    descEs: 'Desafío de baile en cubierta para ganar un sombrero oficial.',
    badgeEn: 'Showdown',
    badgeEs: 'Duelo de Baile',
  },
  {
    id: 'photographer',
    category: 'keepsake',
    titleEn: 'Pro Marine Photographer',
    titleEs: 'Fotógrafo Profesional Marino',
    descEn: 'Dedicated photographer taking 4K underwater & deck portraits.',
    descEs: 'Fotógrafo dedicado capturando retratos 4K dentro y fuera del agua.',
    badgeEn: '4K Memories',
    badgeEs: 'Recuerdos 4K',
  },
  {
    id: 'drone-reel',
    category: 'keepsake',
    titleEn: '4K Drone Reel Capture',
    titleEs: 'Captura con Dron 4K',
    descEn: 'Aerial 4K cinematic video clip of your group in the sandbar.',
    descEs: 'Video aéreo cinematográfico 4K de tu grupo en la piscina natural.',
    badgeEn: 'Cinematic Aerial',
    badgeEs: 'Aéreo Cinematográfico',
  },
];

export const CATEGORY_GRADIENTS: Record<VoyageCategory, string> = {
  water: 'from-teal-900/90 via-cyan-900/70 to-blue-950/90 border-teal-500/30 text-teal-300',
  ritual: 'from-amber-950/90 via-orange-950/70 to-yellow-950/90 border-amber-500/30 text-amber-300',
  deck: 'from-blue-950/90 via-indigo-950/70 to-purple-950/90 border-indigo-500/30 text-indigo-300',
  competition: 'from-rose-950/90 via-red-950/70 to-orange-950/90 border-rose-500/30 text-rose-300',
  keepsake: 'from-fuchsia-950/90 via-pink-950/70 to-purple-950/90 border-fuchsia-500/30 text-fuchsia-300',
};

interface SvgProps {
  itemId: string;
}

export const ItemSvgBackground: React.FC<SvgProps> = ({ itemId }) => {
  switch (itemId) {
    case 'reef-snorkel':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="reefGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#083344" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="240" fill="url(#reefGlow)" />
          {/* Coral Branches */}
          <path d="M40 240 C50 180, 30 140, 70 110 C80 140, 90 170, 90 240 Z" fill="#14b8a6" opacity="0.4" />
          <path d="M330 240 C310 170, 350 120, 320 90 C300 130, 290 180, 280 240 Z" fill="#06b6d4" opacity="0.4" />
          {/* Sea Turtle Silhouette */}
          <g transform="translate(180, 90) scale(0.8)">
            <ellipse cx="40" cy="30" rx="25" ry="18" fill="#2dd4bf" opacity="0.7" />
            <circle cx="68" cy="30" r="8" fill="#2dd4bf" opacity="0.7" />
            <path d="M30 15 C10 -5, -5 5, 20 22 Z" fill="#2dd4bf" opacity="0.7" />
            <path d="M30 45 C10 65, -5 55, 20 38 Z" fill="#2dd4bf" opacity="0.7" />
          </g>
          {/* Bioluminescent Bubbles */}
          <circle cx="120" cy="80" r="6" fill="#67e8f9" opacity="0.6" className="animate-pulse" />
          <circle cx="280" cy="50" r="8" fill="#5eead4" opacity="0.5" />
          <circle cx="210" cy="160" r="4" fill="#a5f3fc" opacity="0.7" />
        </svg>
      );

    case 'natural-pool':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 160 Q100 130 200 160 T400 160 L400 240 L0 240 Z" fill="#0891b2" opacity="0.3" />
          <path d="M0 180 Q100 160 200 180 T400 180 L400 240 L0 240 Z" fill="#06b6d4" opacity="0.4" />
          {/* Sun Rays */}
          <path d="M200 0 L140 180 L160 180 Z" fill="#fde047" opacity="0.15" />
          <path d="M200 0 L240 180 L260 180 Z" fill="#fde047" opacity="0.15" />
          {/* Starfish */}
          <g transform="translate(180, 190) scale(0.6)">
            <path d="M20 0 L26 15 L42 16 L29 26 L34 41 L20 31 L6 41 L11 26 L-2 16 L14 15 Z" fill="#f97316" opacity="0.8" />
          </g>
        </svg>
      );

    case 'dolphin-drift':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Arc leap */}
          <path d="M80 180 Q200 40 320 180" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 6" opacity="0.5" />
          {/* Dolphin silhouette */}
          <g transform="translate(170, 70) rotate(-15) scale(0.9)">
            <path d="M0 30 C30 0, 70 5, 90 25 C70 25, 50 40, 30 35 C20 45, 10 50, 0 30 Z" fill="#38bdf8" opacity="0.85" />
            <path d="M45 12 L55 -5 L60 15 Z" fill="#38bdf8" opacity="0.85" />
          </g>
        </svg>
      );

    case 'floating-bar':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tiki Deck */}
          <rect x="100" y="140" width="200" height="20" rx="6" fill="#78350f" opacity="0.8" />
          <path d="M120 140 L120 80 M280 140 L280 80" stroke="#fbbf24" strokeWidth="4" opacity="0.6" />
          {/* Tiki Hut Roof */}
          <path d="M90 80 L200 40 L310 80 Z" fill="#d97706" opacity="0.7" />
          {/* Cocktails */}
          <path d="M185 135 L195 120 L205 135 Z" fill="#ec4899" opacity="0.9" />
          <path d="M210 135 L220 120 L230 135 Z" fill="#3b82f6" opacity="0.9" />
        </svg>
      );

    case 'top-deck-jump':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deck Railing */}
          <rect x="20" y="60" width="160" height="8" fill="#94a3b8" opacity="0.7" />
          <line x1="40" y1="68" x2="40" y2="120" stroke="#94a3b8" strokeWidth="4" opacity="0.7" />
          <line x1="120" y1="68" x2="120" y2="120" stroke="#94a3b8" strokeWidth="4" opacity="0.7" />
          {/* Splash Rings */}
          <ellipse cx="280" cy="190" rx="50" ry="12" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.7" />
          <ellipse cx="280" cy="190" rx="30" ry="7" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.9" />
        </svg>
      );

    case 'departure-horn':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Conch Shell */}
          <g transform="translate(130, 80) scale(1.1)">
            <path d="M20 60 Q40 10 90 30 Q120 70 70 90 Q30 90 20 60 Z" fill="#f59e0b" opacity="0.75" />
            <path d="M40 55 Q60 25 80 40 Q90 65 60 75 Z" fill="#d97706" opacity="0.6" />
          </g>
          {/* Acoustic Wave Rings */}
          <circle cx="230" cy="120" r="35" stroke="#fbbf24" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="8 4" />
          <circle cx="230" cy="120" r="60" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="10 5" />
        </svg>
      );

    case 'golden-hour-toast':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Setting Sun */}
          <circle cx="200" cy="130" r="50" fill="#f97316" opacity="0.6" />
          {/* Clinking Glasses */}
          <g transform="translate(160, 90)">
            <path d="M15 10 L30 50 L0 50 Z" fill="#fde047" opacity="0.7" />
            <line x1="15" y1="50" x2="15" y2="75" stroke="#fde047" strokeWidth="3" opacity="0.7" />
          </g>
          <g transform="translate(210, 90) scale(-1, 1)">
            <path d="M15 10 L30 50 L0 50 Z" fill="#fde047" opacity="0.7" />
            <line x1="15" y1="50" x2="15" y2="75" stroke="#fde047" strokeWidth="3" opacity="0.7" />
          </g>
        </svg>
      );

    case 'rum-table':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rum Bottle */}
          <rect x="180" y="80" width="40" height="90" rx="8" fill="#b45309" opacity="0.8" />
          <rect x="192" y="55" width="16" height="25" fill="#78350f" opacity="0.9" />
          <rect x="185" y="105" width="30" height="40" fill="#fef3c7" opacity="0.85" />
          {/* Label text lines */}
          <line x1="190" y1="118" x2="210" y2="118" stroke="#92400e" strokeWidth="2" />
          <line x1="192" y1="126" x2="208" y2="126" stroke="#92400e" strokeWidth="2" />
        </svg>
      );

    case 'bachata-bootcamp':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Musical Notes */}
          <path d="M100 80 L140 60 L140 120 M100 100 L140 80" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          <circle cx="90" cy="120" r="12" fill="#818cf8" opacity="0.7" />
          <circle cx="130" cy="100" r="12" fill="#818cf8" opacity="0.7" />
          {/* Footstep footprints */}
          <ellipse cx="260" cy="140" rx="10" ry="18" fill="#a5b4fc" opacity="0.5" transform="rotate(15 260 140)" />
          <ellipse cx="295" cy="120" rx="10" ry="18" fill="#a5b4fc" opacity="0.5" transform="rotate(-10 295 120)" />
        </svg>
      );

    case 'mofongo-masterclass':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pilón Mortar */}
          <path d="M150 120 L160 190 L240 190 L250 120 Z" fill="#78350f" opacity="0.8" />
          <ellipse cx="200" cy="120" rx="50" ry="12" fill="#92400e" opacity="0.9" />
          {/* Pestle */}
          <rect x="210" y="60" width="22" height="90" rx="11" fill="#b45309" transform="rotate(20 210 60)" opacity="0.85" />
        </svg>
      );

    case 'foam-drop':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Foam Bubbles */}
          <circle cx="100" cy="180" r="30" fill="#ffffff" opacity="0.25" />
          <circle cx="150" cy="150" r="45" fill="#ffffff" opacity="0.3" />
          <circle cx="220" cy="160" r="50" fill="#ffffff" opacity="0.35" />
          <circle cx="290" cy="175" r="38" fill="#ffffff" opacity="0.25" />
          <circle cx="180" cy="100" r="25" fill="#ffffff" opacity="0.2" />
        </svg>
      );

    case 'silent-disco':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Headphones */}
          <path d="M130 140 C130 80, 270 80, 270 140" stroke="#c084fc" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
          <rect x="110" y="130" width="30" height="50" rx="12" fill="#a855f7" opacity="0.8" />
          <rect x="260" y="130" width="30" height="50" rx="12" fill="#06b6d4" opacity="0.8" />
        </svg>
      );

    case 'reef-bingo':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid card */}
          <rect x="120" y="50" width="160" height="140" rx="12" stroke="#fb7185" strokeWidth="3" fill="#881337" opacity="0.6" />
          <line x1="173" y1="50" x2="173" y2="190" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
          <line x1="226" y1="50" x2="226" y2="190" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
          <line x1="120" y1="96" x2="280" y2="96" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
          <line x1="120" y1="143" x2="280" y2="143" stroke="#f43f5e" strokeWidth="2" opacity="0.5" />
        </svg>
      );

    case 'sandbar-games':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Limbo Bar */}
          <line x1="60" y1="100" x2="340" y2="100" stroke="#fb923c" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          <line x1="80" y1="100" x2="80" y2="200" stroke="#f97316" strokeWidth="4" opacity="0.7" />
          <line x1="320" y1="100" x2="320" y2="200" stroke="#f97316" strokeWidth="4" opacity="0.7" />
        </svg>
      );

    case 'dance-off':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Woofer Speaker */}
          <rect x="150" y="50" width="100" height="140" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" opacity="0.8" />
          <circle cx="200" cy="90" r="18" fill="#4338ca" opacity="0.9" />
          <circle cx="200" cy="150" r="28" fill="#4338ca" opacity="0.9" />
        </svg>
      );

    case 'photographer':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Camera aperture lens */}
          <circle cx="200" cy="120" r="55" fill="#701a75" stroke="#e879f9" strokeWidth="4" opacity="0.7" />
          <circle cx="200" cy="120" r="35" stroke="#f0abfc" strokeWidth="3" fill="none" opacity="0.8" />
          <polygon points="200,65 210,85 190,85" fill="#e879f9" opacity="0.6" />
          <polygon points="255,120 235,130 235,110" fill="#e879f9" opacity="0.6" />
        </svg>
      );

    case 'drone-reel':
      return (
        <svg viewBox="0 0 400 240" className="w-full h-full opacity-80 transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Quadcopter Drone */}
          <circle cx="200" cy="120" r="16" fill="#a21caf" opacity="0.9" />
          <line x1="140" y1="60" x2="260" y2="180" stroke="#d946ef" strokeWidth="4" opacity="0.7" />
          <line x1="260" y1="60" x2="140" y2="180" stroke="#d946ef" strokeWidth="4" opacity="0.7" />
          <circle cx="140" cy="60" r="22" stroke="#f0abfc" strokeWidth="2" fill="none" opacity="0.8" className="animate-spin" />
          <circle cx="260" cy="60" r="22" stroke="#f0abfc" strokeWidth="2" fill="none" opacity="0.8" className="animate-spin" />
          <circle cx="140" cy="180" r="22" stroke="#f0abfc" strokeWidth="2" fill="none" opacity="0.8" className="animate-spin" />
          <circle cx="260" cy="180" r="22" stroke="#f0abfc" strokeWidth="2" fill="none" opacity="0.8" className="animate-spin" />
        </svg>
      );

    default:
      return null;
  }
};
