import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useBrand } from '../../contexts/BrandContext';
import { getSocialMediaData, SocialMediaAccount } from '../../services/socialMediaService';

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />
};

const Footer = () => {
  const { brandSettings } = useBrand();
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([]);

  useEffect(() => {
    const loadSocialAccounts = async () => {
      const data = await getSocialMediaData();
      setSocialAccounts(data.accounts.filter((a: SocialMediaAccount) => a.enabled));
    };
    loadSocialAccounts();
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#04131D] py-16 text-slate-300">
      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#0A2B3D] text-xl shadow-lg border border-amber-500/30">
                {brandSettings.brandicon ? (
                  <img src={brandSettings.brandicon} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  '🦞'
                )}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">{brandSettings.brandName}</h3>
                <span className="block text-[0.625rem] font-bold tracking-[0.2em] text-teal-400 uppercase">
                  Dominican Republic Excursions
                </span>
              </div>
            </div>
            <p className="max-w-md text-sm font-light leading-relaxed text-slate-300">
              <FormattedMessage id="footer.description" />
            </p>
            
            {socialAccounts.length > 0 && (
              <div className="mt-8 flex gap-3">
                {socialAccounts.map((account) => (
                  <a
                    key={account.platform}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-teal-600 hover:text-white"
                    title={`Follow on ${account.platform}`}
                  >
                    {platformIcons[account.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg font-bold text-white">
              <FormattedMessage id="footer.quickLinks" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#top" className="text-slate-300 transition hover:text-teal-400">
                  <FormattedMessage id="footer.home" />
                </Link>
              </li>
              <li>
                <Link to="/tours#top" className="text-slate-300 transition hover:text-teal-400">
                  <FormattedMessage id="footer.tours" />
                </Link>
              </li>
              <li>
                <Link to="/transport#top" className="text-slate-300 transition hover:text-teal-400">
                  <FormattedMessage id="footer.transport" defaultMessage="Transport" />
                </Link>
              </li>
              <li>
                <Link to="/contact#top" className="text-slate-300 transition hover:text-teal-400">
                  <FormattedMessage id="footer.contact" />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="inline-flex items-center gap-1.5 text-slate-400 transition hover:text-amber-400">
                  <MdAdminPanelSettings className="h-4 w-4" />
                  <FormattedMessage id="footer.admin" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-serif text-lg font-bold text-white">Excursion Guarantee</h4>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              Licensed crew, safety protocols, and personalized VIP service across Saona, Bávaro, and Catalina.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-950/40 px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-teal-300">
              ✓ Direct WhatsApp Booking
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-400">
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
