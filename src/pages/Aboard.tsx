import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { HiSparkles, HiVolumeUp, HiShieldCheck, HiArrowRight } from 'react-icons/hi';
import { useI18n } from '../contexts/I18nContext';
import { useBrand } from '../contexts/BrandContext';
import { VOYAGE_ITEMS, CATEGORY_GRADIENTS, ItemSvgBackground, VoyageCategory } from '../components/VoyageSvgBackgrounds';
import { soundEngine } from '../lib/soundEngine';

const Aboard: React.FC = () => {
  const { locale } = useI18n();
  const { brandSettings } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; labelEn: string; labelEs: string }[] = [
    { id: 'all', labelEn: 'All Activities', labelEs: 'Todas las Actividades' },
    { id: 'water', labelEn: 'Water & Reef', labelEs: 'Agua y Arrecife' },
    { id: 'ritual', labelEn: 'Dominican Rituals', labelEs: 'Rituales Dominicanos' },
    { id: 'deck', labelEn: 'Deck Party', labelEs: 'Fiesta en Cubierta' },
    { id: 'competition', labelEn: 'Games & Contests', labelEs: 'Juegos y Concursos' },
    { id: 'keepsake', labelEn: '4K Memories', labelEs: 'Recuerdos 4K' },
  ];

  const filteredItems = VOYAGE_ITEMS.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleCardClick = (category: VoyageCategory) => {
    switch (category) {
      case 'water':
        soundEngine.playOceanWaveFx(1.8);
        break;
      case 'ritual':
        soundEngine.playCaribbeanHornFx(1.8);
        break;
      case 'deck':
        soundEngine.playPartyCheerFx(1.5);
        break;
      case 'competition':
        soundEngine.playBongoTapFx('high');
        break;
      case 'keepsake':
        soundEngine.playTropicalSplashFx();
        break;
    }
  };

  const handleBookClick = (title: string) => {
    const text = encodeURIComponent(
      `Hello! I'm interested in booking the "${title}" activity on the ${brandSettings.brandName} catamaran.`
    );
    const whatsappUrl = `https://wa.me/${brandSettings.phoneNumber.replace(/\+/g, '')}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#04131D] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
            <HiSparkles className="w-4 h-4 text-teal-400 animate-spin" />
            <span>Catalogue Aboard</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {locale === 'es' ? 'Experiencias de Autor a Bordo' : 'Artistic Voyage Experiences Aboard'}
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-slate-300 font-light leading-relaxed mb-8">
            {locale === 'es'
              ? 'Descubre 17 actividades exclusivas diseñadas con arte caribeño, música en vivo, servicio de bar flotante y fotografía submarina 4K.'
              : 'Explore 17 handcrafted activities featuring artistic Caribbean illustrations, live deck entertainment, floating bar luxury, and 4K marine capture.'}
          </p>

          {/* Sound FX Audio Test Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-300">
            <HiVolumeUp className="w-4 h-4 text-amber-400" />
            <span>{locale === 'es' ? 'Haz clic en cualquier tarjeta para activar los efectos de sonido del Caribe' : 'Click any card to play Caribbean Web Audio SFX'}</span>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                soundEngine.playBongoTapFx('high');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20 scale-105'
                  : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-teal-500/40 hover:text-white'
              }`}
            >
              {locale === 'es' ? cat.labelEs : cat.labelEn}
            </button>
          ))}
        </div>

        {/* 17 Activity SVG Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            const cardGradient = CATEGORY_GRADIENTS[item.category];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => handleCardClick(item.category)}
                className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${cardGradient} p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between`}
              >
                {/* Background Vector Artwork */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                  <ItemSvgBackground itemId={item.id} />
                </div>

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[0.7rem] font-bold uppercase tracking-widest text-slate-200">
                      {locale === 'es' ? item.badgeEs : item.badgeEn}
                    </span>
                    <HiShieldCheck className="w-5 h-5 text-teal-400 opacity-80" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {locale === 'es' ? item.titleEs : item.titleEn}
                  </h3>

                  <p className="text-sm text-slate-200/90 leading-relaxed mb-6 font-light">
                    {locale === 'es' ? item.descEs : item.descEn}
                  </p>
                </div>

                {/* Card Action */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-300 group-hover:underline flex items-center gap-1">
                    {locale === 'es' ? 'Explorar Detalle' : 'Explore Feature'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookClick(locale === 'es' ? item.titleEs : item.titleEn);
                    }}
                    className="p-2.5 rounded-full bg-teal-500 text-slate-950 hover:bg-teal-400 transition-transform hover:scale-110"
                    title="Reserve activity"
                  >
                    <HiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Aboard;
