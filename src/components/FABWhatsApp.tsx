import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBrand } from '../contexts/BrandContext';
import { generateWhatsAppMessage } from '../utils/whatsapp';

interface FABWhatsAppProps {
  phoneNumber?: string;
  message?: string;
}

const FABWhatsApp: React.FC<FABWhatsAppProps> = ({
  phoneNumber,
  message = 'Hola! Me gustaría información sobre sus tours en Punta Cana.'
}) => {
  const { brandSettings } = useBrand();
  const effectivePhone = phoneNumber || brandSettings.phoneNumber || '+18095553333';

  const handleClick = () => {
    window.open(generateWhatsAppMessage(effectivePhone, message), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-emerald-400/40 bg-[#04131D] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl animate-fab-glow-wave transition-transform duration-300 hover:scale-110"
      aria-label="Contact VIP Concierge via WhatsApp"
      title="Chat directly with our VIP Concierge"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <FaWhatsapp className="h-5 w-5 text-emerald-400" />
      <span className="hidden sm:inline text-[0.7rem] tracking-[0.15em]">VIP Concierge</span>
    </button>
  );
};

export default FABWhatsApp;
