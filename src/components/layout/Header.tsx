import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdHome, MdTour, MdLocalTaxi, MdEmail, MdLibraryBooks } from 'react-icons/md';
import LanguageSwitcher from '../LanguageSwitcher';
import { useBrand } from '../../contexts/BrandContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { brandSettings } = useBrand();

  return (
    <header className="sticky top-0 z-50 overflow-visible">
      <div className="lobster-topbar hidden sm:block">
        <div className="section-shell flex items-center justify-between py-2">
          <span>DOMINICAN REPUBLIC · LOCAL CREW · BIG BLUE DAYS</span>
          <span>Plan in minutes · Confirm on WhatsApp</span>
        </div>
      </div>
      <div className="lobster-header">
        <div className="section-shell flex items-center justify-between py-3 sm:py-4">
          <Link to="/#top" className="group flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <div className="lobster-logo overflow-hidden" aria-hidden="true">
              {brandSettings.brandicon ? <img src={brandSettings.brandicon} alt="" className="h-full w-full object-cover" /> : '🦞'}
            </div>
            <div>
              <span className="block font-heading text-xl font-bold leading-none tracking-tight text-[#061d2b] sm:text-2xl">{brandSettings.brandName}</span>
              <span className="mt-1 hidden text-[.61rem] font-extrabold tracking-[.18em] text-[#0a7280] sm:block">CARIBBEAN, CURATED</span>
            </div>
          </Link>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-[#061d2b]/10 bg-white/70 text-[#061d2b] shadow-sm transition md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <HiX className="h-8 w-8" /> : <HiMenu className="h-8 w-8" />}
        </button>

        <nav
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-3 right-3 top-[calc(100%+10px)] flex-col gap-2 rounded-[1.35rem] border border-[#061d2b]/10 bg-[#f8f5ef]/95 px-4 py-4 shadow-[0_16px_48px_rgba(6,29,43,.16)] backdrop-blur-xl md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <Link to="/#top" onClick={() => setIsMenuOpen(false)} className="nav-link-pill">
            <MdHome />
            <FormattedMessage id="nav.home" />
          </Link>
          <Link to="/tours#top" onClick={() => setIsMenuOpen(false)} className="nav-link-pill">
            <MdTour />
            <FormattedMessage id="nav.tours" />
          </Link>
          <Link to="/transport#top" onClick={() => setIsMenuOpen(false)} className="nav-link-pill">
            <MdLocalTaxi />
            <FormattedMessage id="nav.transport" defaultMessage="Transport" />
          </Link>
          <Link to="/blog#top" onClick={() => setIsMenuOpen(false)} className="nav-link-pill">
            <MdLibraryBooks />
            <FormattedMessage id="nav.blog" defaultMessage="Blog" />
          </Link>
          <Link to="/contact#top" onClick={() => setIsMenuOpen(false)} className="nav-link-pill">
            <MdEmail />
            <FormattedMessage id="nav.contact" />
          </Link>
          <LanguageSwitcher />
          <Link to="/contact#top" onClick={() => setIsMenuOpen(false)} className="lobster-nav-cta text-center">
            Plan my day
          </Link>
        </nav>
      </div>
      </div>
    </header>
  );
};

export default Header;
