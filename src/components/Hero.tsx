import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { HiArrowDown, HiCheck, HiStar, HiShieldCheck } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useBrand } from '../contexts/BrandContext';

interface HeroProps {
  backgroundImage: string;
  backgroundImageMobile?: string;
  backgroundVideo?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, backgroundImageMobile, backgroundVideo }) => {
  const { brandSettings } = useBrand();

  return (
    <section className="relative overflow-hidden bg-[#04131D] text-white">
      {/* Background Media - Positive z-0 Layering to prevent WebGL canvas flickering */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#04131D]">
        {backgroundVideo ? (
          <video
            className="h-full w-full object-cover object-center opacity-100 pointer-events-none select-none"
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage}
            aria-hidden="true"
          />
        ) : (
          <picture className="block h-full w-full">
            {backgroundImageMobile && (
              <source media="(max-width: 767px)" srcSet={backgroundImageMobile} type="image/webp" />
            )}
            <img
              src={backgroundImage}
              alt="Punta Cana Excursion"
              className="h-full w-full object-cover object-center md:object-[center_20%] opacity-100 pointer-events-none select-none"
            />
          </picture>
        )}
      </div>

      {/* Subtle bottom-only gradient for headline legibility while preserving vibrant bright WebP colors & shine */}
      <div className="absolute inset-x-0 bottom-0 z-1 h-56 bg-gradient-to-t from-[#04131D]/90 via-[#04131D]/45 to-transparent pointer-events-none" />

      {/* Main Hero Content Container */}
      <div className="section-shell relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Main Editorial Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 xl:col-span-7"
          >
            {/* Location & Trust Kicker */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-950/40 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
                Saona Island · Catalina · Bávaro Coast
              </span>
            </div>

            {/* Editorial Main Headline */}
            <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <FormattedMessage id="hero.title" values={{ brand: brandSettings.brandName }} />
            </h1>

            {/* Subtitle */}
            <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-slate-200 sm:text-xl">
              <FormattedMessage id="hero.subtitle" />
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="mb-12 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link to="/tours#top" className="tropical-button">
                <FormattedMessage id="hero.cta" />
              </Link>
              <Link to="/transport#top" className="tropical-button-outline">
                <FormattedMessage id="nav.transport" defaultMessage="Private Transport" />
              </Link>
              <Link to="/contact#top" className="tropical-button-outline border-white/20 hover:border-white/40">
                <FormattedMessage id="contact.title" defaultMessage="Concierge" />
              </Link>
            </div>

            {/* High-Trust Value Signals */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <HiShieldCheck className="h-5 w-5 text-teal-400" />
                <span>Verified Licensed Crew</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="h-5 w-5 text-amber-400" />
                <span>Instant WhatsApp Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="h-5 w-5 text-teal-400" />
                <span>Private Excursion Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Luxury Floating Rating Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:col-span-4 lg:block xl:col-span-5"
          >
            <div className="relative mx-auto max-w-sm rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-2xl transition-transform hover:-translate-y-1">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                  4.98 / 5.0 Rating
                </span>
              </div>
              <blockquote className="mb-4 font-serif italic text-sm leading-relaxed text-slate-100">
                “The highlight of our Dominican holiday. The private boat crew treated us like royalty, and the fresh seafood on Saona was unbeatable.”
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white text-xs border border-white/20">
                  ES
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Elena & Marcus S.</div>
                  <div className="text-[0.7rem] text-slate-300">Honeymoon Trip · Toronto, Canada</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#arrival"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/60 transition hover:text-white md:flex z-10"
      >
        <span>Discover The Fleet</span>
        <HiArrowDown className="h-4 w-4 animate-bounce text-teal-400" />
      </a>
    </section>
  );
};

export default Hero;
