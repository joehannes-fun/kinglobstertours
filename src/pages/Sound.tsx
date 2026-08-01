import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiMusicNote, HiSparkles, HiChatAlt2 } from 'react-icons/hi';
import { useI18n } from '../contexts/I18nContext';
import { useBrand } from '../contexts/BrandContext';
import { soundEngine } from '../lib/soundEngine';

export interface DjTrack {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  vibeEn: string;
  vibeEs: string;
  fileUrl: string;
}

export const DJ_TRACKS: DjTrack[] = [
  {
    id: 'bibijagua-club',
    title: 'Bibijagua Club',
    genre: 'Hip Hop & Latin Trap',
    bpm: 130,
    vibeEn: 'High-energy bass drop for peak deck party moments.',
    vibeEs: 'Bajos potentes para los momentos cumbre de la fiesta.',
    fileUrl: '/audio/dj/bibijagua-club.mp3',
  },
  {
    id: 'dembow-republica',
    title: 'Dembow República',
    genre: 'Dembow & Urban Santo Domingo',
    bpm: 118,
    vibeEn: 'Authentic Dominican street rhythm that gets everyone dancing.',
    vibeEs: 'Ritmo callejero dominicano auténtico que pone a todos a bailar.',
    fileUrl: '/audio/dj/dembow-republica.mp3',
  },
  {
    id: 'afro-caribe',
    title: 'Afro-Caribe Fusion',
    genre: 'Afrobeats & Amapiano',
    bpm: 105,
    vibeEn: 'Smooth tropical sunset rhythm with deep percussive grooves.',
    vibeEs: 'Ritmo tropical para el atardecer con percusión profunda.',
    fileUrl: '/audio/dj/afro-caribe.mp3',
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour Lagoon',
    genre: 'Tropical Melodic House',
    bpm: 122,
    vibeEn: 'Euphoric floating-bar synth melodies in waist-deep waters.',
    vibeEs: 'Melodías eufóricas en la barra flotante con agua a la cintura.',
    fileUrl: '/audio/dj/golden-hour.mp3',
  },
  {
    id: 'todo-el-mundo',
    title: 'Todo el Mundo',
    genre: 'Latin Pop & Top 40 Fiesta',
    bpm: 128,
    vibeEn: 'Sing-along anthem uniting guests from across the globe.',
    vibeEs: 'Himno festivo para cantar en grupo y unir a todos los navegantes.',
    fileUrl: '/audio/dj/todo-el-mundo.mp3',
  },
];

const Sound: React.FC = () => {
  const { locale } = useI18n();
  const { brandSettings } = useBrand();

  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const stopSynthRef = useRef<(() => void) | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const stopCurrentAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (stopSynthRef.current) {
      stopSynthRef.current();
      stopSynthRef.current = null;
    }
    setIsPlaying(false);
    setActiveTrackId(null);
    setPlaybackTime(0);
  };

  const handlePlayTrack = (track: DjTrack) => {
    // If same track is playing, pause it
    if (activeTrackId === track.id && isPlaying) {
      stopCurrentAudio();
      return;
    }

    stopCurrentAudio();
    setActiveTrackId(track.id);
    setIsPlaying(true);
    setPlaybackTime(0);

    // Try loading MP3 first
    const audio = new Audio(track.fileUrl);
    audioRef.current = audio;

    let startTime = Date.now();
    let duration = 7.0; // 7 seconds clip requirement

    const updateTimer = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setPlaybackTime(Math.min(elapsed, duration));

      // Enforce 1-second volume fadeout from 6.0s to 7.0s
      if (audioRef.current) {
        if (elapsed >= 6.0 && elapsed < 7.0) {
          const fadeProgress = (7.0 - elapsed) / 1.0;
          audioRef.current.volume = Math.max(0, Math.min(1, fadeProgress));
        } else if (elapsed < 6.0) {
          audioRef.current.volume = 1.0;
        }
      }

      if (elapsed >= duration) {
        stopCurrentAudio();
      }
    };

    audio
      .play()
      .then(() => {
        timerRef.current = window.setInterval(updateTimer, 100);
      })
      .catch(() => {
        // Fallback to Web Audio Synthesizer if MP3 not present
        audioRef.current = null;
        stopSynthRef.current = soundEngine.playSynthDjTrack(track.id, duration, 1.0);
        timerRef.current = window.setInterval(updateTimer, 100);
      });
  };

  const handleSongRequestClick = (trackTitle: string) => {
    const text = encodeURIComponent(
      `Hello DJ! I would love to hear "${trackTitle}" during our catamaran excursion with ${brandSettings.brandName}!`
    );
    const whatsappUrl = `https://wa.me/${brandSettings.phoneNumber.replace(/\+/g, '')}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#04131D] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
            <HiMusicNote className="w-4 h-4 text-purple-400 animate-bounce" />
            <span>Onboard Sound & DJ Booth</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {locale === 'es' ? 'Sonido Caribeño en Vivo' : 'Live Caribbean Deck Sound'}
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light leading-relaxed mb-6">
            {locale === 'es'
              ? 'Escucha 5 adelantos de sonido producidos exclusivamente para la cubierta del catamarán. Clips de 7 segundos con desvanecimiento de audio.'
              : 'Preview 5 curated DJ audio samples custom blended for the catamaran deck. 7-second high-energy previews with smooth 1s volume fadeout.'}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300">
            <HiVolumeUp className="w-4 h-4 text-teal-400" />
            <span>{locale === 'es' ? '7 Segundos de Muestra · Fadeout Suave' : '7-Second Clip Preview · Smooth 1s Fadeout'}</span>
          </div>
        </motion.div>

        {/* Playing Status Deck / Equalizer Visualizer */}
        {isPlaying && activeTrackId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300">
                <HiSparkles className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">
                  {locale === 'es' ? 'Reproduciendo Adelante' : 'Now Previewing'}
                </div>
                <div className="text-xl font-bold text-white">
                  {DJ_TRACKS.find((t) => t.id === activeTrackId)?.title}
                </div>
              </div>
            </div>

            {/* Equalizer Audio Bar Spectrum */}
            <div className="flex items-end gap-1.5 h-10 px-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.floor(Math.random() * 80) + 20}%`,
                    animationDuration: `${0.3 + (i % 5) * 0.15}s`,
                  }}
                />
              ))}
            </div>

            {/* Progress Counter */}
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-cyan-300">
                {playbackTime.toFixed(1)}s
              </span>
              <span className="text-xs text-slate-400 block">/ 7.0s</span>
            </div>
          </motion.div>
        )}

        {/* Tracks List */}
        <div className="space-y-4">
          {DJ_TRACKS.map((track, idx) => {
            const isThisPlaying = isPlaying && activeTrackId === track.id;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                  isThisPlaying
                    ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-900/60 border-white/10 hover:border-purple-500/30 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-5">
                  {/* Play Button */}
                  <button
                    onClick={() => handlePlayTrack(track)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-slate-950 font-bold transition-transform duration-300 ${
                      isThisPlaying
                        ? 'bg-purple-400 scale-105 shadow-lg shadow-purple-500/40'
                        : 'bg-teal-400 hover:bg-teal-300 hover:scale-105'
                    }`}
                    title={isThisPlaying ? 'Pause sample' : 'Play 7s sample'}
                  >
                    {isThisPlaying ? <HiPause className="w-7 h-7" /> : <HiPlay className="w-7 h-7 ml-0.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {track.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[0.7rem] font-medium text-slate-300">
                        {track.genre}
                      </span>
                      <span className="text-xs font-mono text-purple-400 font-semibold">{track.bpm} BPM</span>
                    </div>

                    <p className="text-sm text-slate-300 font-light">
                      {locale === 'es' ? track.vibeEs : track.vibeEn}
                    </p>
                  </div>
                </div>

                {/* Request track on WhatsApp */}
                <button
                  onClick={() => handleSongRequestClick(track.title)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-purple-900/50 border border-slate-700 hover:border-purple-400/50 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <HiChatAlt2 className="w-4 h-4 text-emerald-400" />
                  <span>{locale === 'es' ? 'Pedir al DJ' : 'Request Song'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sound;
