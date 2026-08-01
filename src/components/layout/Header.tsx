import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdHome, MdTour, MdLocalTaxi, MdEmail, MdLibraryBooks, MdDirectionsBoat, MdMusicNote } from 'react-icons/md';
import LanguageSwitcher from '../LanguageSwitcher';
import { useBrand } from '../../contexts/BrandContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { brandSettings } = useBrand();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Banner - Subtle Luxury Bar */}
      <div className="hidden bg-[#04131D] text-white/80 py-2 px-4 text-[0.7rem] font-semibold tracking-[0.2em] uppercase border-b border-white/10 sm:block">
        <div className="section-shell flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>PUNTA CANA · BÁVARO · PRIVATE & BOUTIQUE SEA TOURS</span>
          </div>
          <div className="flex items-center gap-6 text-white/70">
            <span>Direct WhatsApp Concierge</span>
            <span className="text-amber-400/90 font-bold">★ 4.98 Guest Rating</span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-slate-900/10 shadow-md py-3' 
          : 'bg-[#FAF7F2]/80 backdrop-blur-md border-b border-slate-900/5 py-4'
      }`}>
        <div className="section-shell flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/#top" className="group flex items-center gap-3.5" onClick={() => setIsMenuOpen(false)}>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-[#0A2B3D] text-xl shadow-md border border-amber-500/30 transition-transform duration-300 group-hover:scale-105">
              <img
                src={brandSettings.brandicon || '/yohantourslogo.jpeg'}
                alt={brandSettings.brandName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="block font-heading text-xl font-bold tracking-tight text-[#04131D] sm:text-2xl">
                {brandSettings.brandName}
              </span>
              <span className="block text-[0.625rem] font-bold tracking-[0.22em] text-teal-700 uppercase">
                Dominican Republic
              </span>
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-300/80 bg-white/90 text-[#04131D] shadow-sm transition hover:bg-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <HiX className="h-6 w-6 text-slate-800" /> : <HiMenu className="h-6 w-6 text-slate-800" />}
          </button>

          {/* Desktop & Mobile Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } absolute left-4 right-4 top-[calc(100%+12px)] flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            <Link
              to="/#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname === '/' ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdHome className="text-lg opacity-75" />
              <FormattedMessage id="nav.home" />
            </Link>
            <Link
              to="/tours#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/tours') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdTour className="text-lg opacity-75" />
              <FormattedMessage id="nav.tours" />
            </Link>
            <Link
              to="/transport#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/transport') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdLocalTaxi className="text-lg opacity-75" />
              <FormattedMessage id="nav.transport" defaultMessage="Transport" />
            </Link>
            <Link
              to="/aboard#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/aboard') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdDirectionsBoat className="text-lg opacity-75" />
              <FormattedMessage id="nav.aboard" defaultMessage="Aboard" />
            </Link>
            <Link
              to="/sound#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/sound') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdMusicNote className="text-lg opacity-75" />
              <FormattedMessage id="nav.sound" defaultMessage="DJ Sound" />
            </Link>
            <Link
              to="/blog#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/blog') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdLibraryBooks className="text-lg opacity-75" />
              <FormattedMessage id="nav.blog" defaultMessage="Blog" />
            </Link>
            <Link
              to="/contact#top"
              onClick={() => setIsMenuOpen(false)}
              className={`nav-link-pill ${location.pathname.startsWith('/contact') ? 'text-teal-700 bg-teal-500/10 font-bold' : ''}`}
            >
              <MdEmail className="text-lg opacity-75" />
              <FormattedMessage id="nav.contact" />
            </Link>

            <div className="my-2 h-px w-full bg-slate-100 md:hidden" />

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                to="/contact#top"
                onClick={() => setIsMenuOpen(false)}
                className="lobster-nav-cta w-full text-center md:w-auto"
              >
                Plan Excursion
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
