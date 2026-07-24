import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { HiArrowDown, HiCheck } from 'react-icons/hi';
import { useBrand } from '../contexts/BrandContext';

interface HeroProps {
  backgroundImage: string;
  backgroundVideo?: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage, backgroundVideo }) => {
  const { brandSettings } = useBrand();

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 z-20"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundVideo && (
        <video
          className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-65"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={backgroundImage}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(103deg,rgba(3,20,29,.88)_2%,rgba(5,40,52,.65)_48%,rgba(4,27,37,.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(255,184,90,.28),transparent_24%),radial-gradient(circle_at_25%_84%,rgba(16,174,174,.25),transparent_34%)]" />

      <div className="section-shell flex min-h-[calc(100svh-5rem)] items-center py-16 md:min-h-[49rem] md:py-24">
        <div className="hero-glass max-w-3xl p-7 md:p-11">
          <p className="site-eyebrow mb-5 text-[#bde8dc] before:bg-[#ffb85a]">
            Punta Cana · Saona · Beyond the resort
          </p>
          <h1 className="mb-5 text-5xl font-bold leading-[.96] text-white md:text-7xl">
            <FormattedMessage id="hero.title" values={{ brand: brandSettings.brandName }} />
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
            <FormattedMessage id="hero.subtitle" />
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/tours#top" className="tropical-button">
              <FormattedMessage id="hero.cta" />
            </Link>
            <Link to="/transport#top" className="tropical-button-outline">
              <FormattedMessage id="nav.transport" defaultMessage="Transport" />
            </Link>
            <Link to="/contact#top" className="tropical-button-outline">
              <FormattedMessage id="contact.title" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/78">
            {['Simple WhatsApp planning', 'Flexible private options', 'Local island know-how'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5"><HiCheck className="text-[#ffb85a]" />{item}</span>
            ))}
          </div>
        </div>
      </div>
      <a href="#arrival" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-white/70 transition hover:text-white md:flex">
        Explore the day <HiArrowDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
