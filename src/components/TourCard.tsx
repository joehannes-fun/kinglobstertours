import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { generateWhatsAppMessage } from '../utils/whatsapp';
import { useBrand } from '../contexts/BrandContext';
import { PricingOption } from '../services/toursService';
import MarkdownRenderer from './ui/MarkdownRenderer';

interface TourCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  pricingOptions?: PricingOption[];
  excursionName: string;
  detailsPath: string;
  enabled?: boolean;
  showPrice?: boolean;
  showDetailsLink?: boolean;
}

const buildPaymentHref = (baseLink: string, amount: number | null): string => {
  const trimmedLink = String(baseLink ?? '').trim();

  if (!trimmedLink || !amount) {
    return '';
  }

  const normalizedBase = trimmedLink.replace(/\/$/, '').replace(/\/\d+(?:\.\d+)?$/, '');
  return `${normalizedBase}/${amount}`;
};

const TourCard: React.FC<TourCardProps> = ({
  image,
  title,
  description,
  price,
  pricingOptions = [],
  excursionName,
  detailsPath,
  enabled = true,
  showPrice = true,
  showDetailsLink = true,
}) => {
  const intl = useIntl();
  const { brandSettings } = useBrand();
  const resolvedPricingOptions = pricingOptions.length > 0
    ? pricingOptions
    : [{ tier: intl.locale === 'es' ? 'Personas' : 'People', price, amount: null }];
  const [selectedDate, setSelectedDate] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    resolvedPricingOptions.reduce<Record<string, number>>((accumulator, option, index) => {
      accumulator[option.tier] = index === 0 ? 1 : 0;
      return accumulator;
    }, {})
  );

  const totalAmount = useMemo(
    () =>
      resolvedPricingOptions.reduce((sum, option) => {
        const quantity = quantities[option.tier] ?? 0;
        return sum + (option.amount ?? 0) * quantity;
      }, 0),
    [quantities, resolvedPricingOptions]
  );

  const selectedQuantitySummary = resolvedPricingOptions
    .filter((option) => (quantities[option.tier] ?? 0) > 0)
    .map((option) => `${option.tier}: ${quantities[option.tier]}`)
    .join(', ');

  const paypalHref = useMemo(
    () => buildPaymentHref(brandSettings.paypalMeLink, totalAmount || null),
    [brandSettings.paypalMeLink, totalAmount]
  );
  const verifoneHref = useMemo(
    () => buildPaymentHref(brandSettings.verifoneLink, totalAmount || null),
    [brandSettings.verifoneLink, totalAmount]
  );

  const formattedSelectedDate = selectedDate
    ? new Intl.DateTimeFormat(intl.locale === 'es' ? 'es-DO' : 'en-US', {
      dateStyle: 'full',
    }).format(new Date(`${selectedDate}T00:00:00`))
    : '';

  const handleQuantityChange = (tier: string, nextValue: string) => {
    const parsedValue = Math.max(0, Number(nextValue) || 0);
    setQuantities((current) => ({ ...current, [tier]: parsedValue }));
  };

  const handleBookNow = () => {
    let message = '';
    message += `Hello, I want to book ${excursionName}\n`;
    message += `Participants: ${selectedQuantitySummary || 'N/A'}\n`;
    message += `Preferred date: ${formattedSelectedDate || 'Not specified'}\n`;
    message += `Price: ${totalAmount > 0 ? totalAmount : price} USD`;
    message += `\n`;
    message += `Hola, deseo reservar el ${excursionName}\n`;
    message += `Participantes: ${selectedQuantitySummary || 'N/A'}\n`;
    message += `Fecha preferida: ${formattedSelectedDate || 'No especificada'}\n`;
    message += `Precio: ${totalAmount > 0 ? totalAmount : price} USD`;

    const whatsappUrl = generateWhatsAppMessage(brandSettings.phoneNumber, message);

    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <article className="lobster-card glass-card flex h-full flex-col justify-between transition duration-300">
      <div className="relative">
        <Link to={detailsPath} className="block overflow-hidden" aria-label={title}>
          <img src={image} alt={title} className="card-image w-full object-cover transition duration-700 hover:scale-105" />
        </Link>
        <div className="absolute left-4 top-4 rounded-full bg-[#061d2b]/80 px-3 py-1.5 text-[.68rem] font-bold uppercase tracking-[.12em] text-white backdrop-blur-md">Curated escape</div>
      </div>

      <div className="flex h-full flex-col space-y-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="card-kicker mb-2">Island day, your way</p>
            <h3 className="text-2xl font-bold text-[#061d2b]">{title}</h3>
          </div>
          {showDetailsLink && (
            <Link to={detailsPath} className="shrink-0 text-sm font-semibold text-[#0a7280] underline decoration-[#0a7280]/30 underline-offset-4 hover:decoration-[#0a7280]">
              <FormattedMessage id="details.view" defaultMessage="View details" />
            </Link>
          )}
        </div>
        <MarkdownRenderer content={description} />

        {showPrice && (
          <div className="flex flex-wrap gap-2">
            {resolvedPricingOptions.map((option) => (
              <span
                key={`${title}-${option.tier}`}
                className="rounded-full bg-[#e9f4ef] px-3 py-1 text-sm font-semibold text-[#174957]"
              >
                {option.tier}: {option.price}
              </span>
            ))}
          </div>
        )}

        {enabled && (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {resolvedPricingOptions.map((option) => (
                <label key={option.tier} className="space-y-2 rounded-2xl border border-[#061d2b]/10 bg-[#f7f7f2] p-3">
                  <span className="block text-sm font-semibold text-[#214250]">{option.tier}</span>
                  <input
                    type="number"
                    min="0"
                    value={quantities[option.tier] ?? 0}
                    onChange={(event) => handleQuantityChange(option.tier, event.target.value)}
                    className="lobster-input w-full px-3 py-2 text-[#061d2b] outline-none"
                  />
                </label>
              ))}
            </div>

            <label className="block space-y-2 text-left">
              <span className="text-sm font-medium text-[#214250]">
                <FormattedMessage id="tours.dateLabel" defaultMessage="Select your preferred date" />
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="lobster-input w-full px-4 py-3 text-[#061d2b] shadow-sm outline-none"
              />
            </label>

            <div className="rounded-2xl bg-[#061d2b] px-4 py-3 text-sm font-semibold text-white">
              <FormattedMessage id="payment.total" defaultMessage="Payment total" />: {totalAmount > 0 ? `$${totalAmount}` : price}
            </div>

            <div className="space-y-3">
              <button onClick={handleBookNow} className="tropical-button w-full">
                <FormattedMessage id="tours.bookNow" />
              </button>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paypalHref && (
                  <a
                    href={paypalHref}
                    target="_blank"
                    rel="noreferrer"
                    className="tropical-button-outline w-full text-center"
                  >
                    <FormattedMessage id="payment.paypal" defaultMessage="Pay with PayPal" />
                  </a>
                )}
                {verifoneHref && (
                  <a
                    href={verifoneHref}
                    target="_blank"
                    rel="noreferrer"
                    className="tropical-button-outline w-full text-center"
                  >
                    <FormattedMessage id="payment.verifone" defaultMessage="Pay with Verifone" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default TourCard;
