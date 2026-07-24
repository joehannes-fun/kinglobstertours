import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { MdPerson, MdEmail, MdPhone, MdMessage, MdSend } from 'react-icons/md';
import { generateContactWhatsAppMessage } from '../utils/whatsapp';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = generateContactWhatsAppMessage(name, email, phone, message);
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="glass-card w-full max-w-2xl rounded-[1.6rem] p-7 md:p-10">
      <p className="site-eyebrow mb-3">Fast, friendly planning</p>
      <h2 className="mb-8 text-4xl font-bold text-[#061d2b]">
        <FormattedMessage id="contact.title" />
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 font-medium text-[#214250]"><MdPerson /> <FormattedMessage id="contact.name" /></span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="lobster-input w-full p-3 outline-none" required />
        </label>
        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 font-medium text-[#214250]"><MdEmail /> <FormattedMessage id="contact.email" /></span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="lobster-input w-full p-3 outline-none" required />
        </label>
        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 font-medium text-[#214250]"><MdPhone /> <FormattedMessage id="contact.phone" /></span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="lobster-input w-full p-3 outline-none" required />
        </label>
        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 font-medium text-[#214250]"><MdMessage /> <FormattedMessage id="contact.message" /></span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="lobster-input w-full p-3 outline-none" rows={5} required />
        </label>

        <button type="submit" className="tropical-button w-full gap-2">
          <MdSend /> <FormattedMessage id="contact.send" />
        </button>
        {isSubmitted && <p className="font-medium text-teal-700"><FormattedMessage id="contact.sent" /></p>}
      </form>
    </div>
  );
};

export default ContactForm;
