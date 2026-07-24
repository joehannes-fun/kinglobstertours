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
  message = 'Hola! Me gustaría información sobre sus tours.'
}) => {
  const { brandSettings } = useBrand();
  const effectivePhone = phoneNumber || brandSettings.phoneNumber || '+18095553333';

  const handleClick = () => {
    window.open(generateWhatsAppMessage(effectivePhone, message), '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-fab fixed bottom-5 right-5 z-50 flex items-center justify-center text-sm font-bold text-white transition-all duration-300 hover:scale-105"
      aria-label="Contact via WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" /><span>WhatsApp us</span>
    </button>
  );
};

export default FABWhatsApp;
