import { BrandSettings } from '../services/brandService';

export type PaymentMethodId = 'stripe' | 'paypal' | 'cash';

export const PAYMENT_METHOD_IDS: PaymentMethodId[] = ['stripe', 'paypal', 'cash'];

export interface PaymentMethodState {
  /** The method has everything it needs to actually take a payment. */
  configured: boolean;
  /** The admin explicitly kept it switched on (only meaningful when configured). */
  enabled: boolean;
  /** Configured AND switched on — this is what the storefront should render. */
  visible: boolean;
}

export type PaymentMethodStates = Record<PaymentMethodId, PaymentMethodState>;

const hasValue = (value?: string | null): boolean =>
  typeof value === 'string' && value.trim().length > 0;

/**
 * A method counts as configured only when the admin supplied the data it needs.
 * Unconfigured methods are hidden from guests no matter what the toggles say.
 */
export const isPaymentMethodConfigured = (
  brandSettings: BrandSettings,
  method: PaymentMethodId
): boolean => {
  switch (method) {
    case 'stripe':
      return Boolean(brandSettings.stripeEnabled) &&
        (hasValue(brandSettings.stripePublishableKey) || hasValue(brandSettings.verifoneLink));
    case 'paypal':
      return hasValue(brandSettings.paypalMeLink);
    case 'cash':
      return hasValue(brandSettings.phoneNumber);
    default:
      return false;
  }
};

/** Visibility toggles default to on, so a freshly configured method shows up right away. */
export const isPaymentMethodEnabled = (
  brandSettings: BrandSettings,
  method: PaymentMethodId
): boolean => brandSettings.paymentVisibility?.[method] ?? true;

export const getPaymentMethodStates = (brandSettings: BrandSettings): PaymentMethodStates =>
  PAYMENT_METHOD_IDS.reduce((states, method) => {
    const configured = isPaymentMethodConfigured(brandSettings, method);
    const enabled = isPaymentMethodEnabled(brandSettings, method);
    states[method] = { configured, enabled, visible: configured && enabled };
    return states;
  }, {} as PaymentMethodStates);

export const isPaymentMethodVisible = (
  brandSettings: BrandSettings,
  method: PaymentMethodId
): boolean =>
  isPaymentMethodConfigured(brandSettings, method) && isPaymentMethodEnabled(brandSettings, method);

/** False when every method is unconfigured or hidden — the storefront then offers WhatsApp only. */
export const hasVisiblePaymentMethod = (brandSettings: BrandSettings): boolean =>
  PAYMENT_METHOD_IDS.some((method) => isPaymentMethodVisible(brandSettings, method));

/** The URL a card payment should open, or '' when only a publishable key is on file. */
export const getCardCheckoutLink = (brandSettings: BrandSettings): string =>
  hasValue(brandSettings.verifoneLink) ? brandSettings.verifoneLink.trim() : '';
