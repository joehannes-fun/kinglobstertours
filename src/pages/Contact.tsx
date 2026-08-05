import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContactForm from '../components/ContactForm';
import { useBrand } from '../contexts/BrandContext';
import { isPaymentMethodVisible } from '../utils/paymentMethods';

const Contact = () => {
  const { brandSettings } = useBrand();
  const showPaypal = isPaymentMethodVisible(brandSettings, 'paypal');
  const showCard = isPaymentMethodVisible(brandSettings, 'stripe') && Boolean(brandSettings.verifoneLink);

  return (
    <div className="py-12 md:py-16">
      <div className="section-shell">
        <div className="mb-10 text-center">
          <p className="site-eyebrow mb-4">One message away</p>
          <h1 className="mb-4 text-5xl font-bold text-[#061d2b]"><FormattedMessage id="contact.title" /></h1>
          <p className="mx-auto max-w-2xl text-lg text-[#214250]"><FormattedMessage id="contact.description" /></p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="glass-card rounded-[1.6rem] p-8">
            <p className="site-eyebrow mb-3">Meet the crew</p>
            <h2 className="mb-5 text-3xl font-bold text-[#061d2b]"><FormattedMessage id="contact.getInTouch" /></h2>
            <p className="mb-2 text-[#214250]"><FormattedMessage id="contact.addressLabel" />: Bávaro, Punta Cana</p>
            <p className="mb-6 text-[#214250]"><FormattedMessage id="contact.phoneLabel" />: {brandSettings.phoneNumber}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {showPaypal && (
                <a href={brandSettings.paypalMeLink} target="_blank" rel="noreferrer" className="tropical-button w-full sm:w-auto">
                  <FormattedMessage id="payment.paypalContact" defaultMessage="Pay deposit with PayPal" />
                </a>
              )}
              {showCard && (
                <a href={brandSettings.verifoneLink} target="_blank" rel="noreferrer" className="tropical-button-outline w-full sm:w-auto">
                  <FormattedMessage id="payment.verifoneContact" defaultMessage="Pay deposit with Verifone" />
                </a>
              )}
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60530.5!2d-68.4156!3d18.6945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea891645dcbfe77%3A0x4877e4aeefa14d62!2sEl%20Cortecito%2C%20Punta%20Cana!5e0!3m2!1sen!2sdo!4v1234567890123!5m2!1sen!2sdo"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: '18px', marginTop: '24px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Punta Cana Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
