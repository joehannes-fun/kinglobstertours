import { apiGet, apiPut } from './apiClient';

export interface PaymentVisibility {
  stripe?: boolean;
  paypal?: boolean;
  cash?: boolean;
}

export interface BrandSettings {
  brandName: string;
  phoneNumber: string;
  paypalMeLink: string;
  verifoneLink: string;
  brandicon: string;
  stripePublishableKey?: string;
  stripeSecretKey?: string;
  stripeEnabled?: boolean;
  /** Per-method visibility switches. Missing entries mean "show when configured". */
  paymentVisibility?: PaymentVisibility;
  customAdminPassword?: string;
}

export const defaultBrandSettings: BrandSettings = {
  brandName: 'Dionicio VIP Tours',
  phoneNumber: '+1 (809) 555-0123',
  paypalMeLink: '',
  verifoneLink: '',
  brandicon: '',
  stripePublishableKey: '',
  stripeSecretKey: '',
  stripeEnabled: false,
  paymentVisibility: { stripe: true, paypal: true, cash: true },
  customAdminPassword: '',
};

const normalizePaymentVisibility = (input: unknown): PaymentVisibility => {
  const source = (input ?? {}) as Record<string, unknown>;
  return {
    stripe: typeof source.stripe === 'boolean' ? source.stripe : true,
    paypal: typeof source.paypal === 'boolean' ? source.paypal : true,
    cash: typeof source.cash === 'boolean' ? source.cash : true,
  };
};

const normalizeBrandSettings = (input: Partial<BrandSettings> | null | undefined): BrandSettings => ({
  brandName:
    typeof input?.brandName === 'string' && input.brandName.trim()
      ? input.brandName
      : defaultBrandSettings.brandName,
  phoneNumber:
    typeof input?.phoneNumber === 'string' && input.phoneNumber.trim()
      ? input.phoneNumber
      : defaultBrandSettings.phoneNumber,
  // Payment links stay empty when unset: an empty link means "not configured",
  // which is what hides the method from guests.
  paypalMeLink: typeof input?.paypalMeLink === 'string' ? input.paypalMeLink : '',
  verifoneLink: typeof input?.verifoneLink === 'string' ? input.verifoneLink : '',
  brandicon:
    typeof input?.brandicon === 'string' && input.brandicon.trim()
      ? input.brandicon
      : defaultBrandSettings.brandicon,
  stripePublishableKey:
    typeof input?.stripePublishableKey === 'string' ? input.stripePublishableKey : '',
  stripeSecretKey:
    typeof input?.stripeSecretKey === 'string' ? input.stripeSecretKey : '',
  stripeEnabled:
    typeof input?.stripeEnabled === 'boolean' ? input.stripeEnabled : false,
  paymentVisibility: normalizePaymentVisibility(input?.paymentVisibility),
  customAdminPassword:
    typeof input?.customAdminPassword === 'string' ? input.customAdminPassword : '',
});

export const getBrandSettings = async (): Promise<BrandSettings> => {
  try {
    const data = await apiGet<unknown>('brand');
    const brandData = (data as Record<string, unknown>).record ?? data;
    return normalizeBrandSettings(brandData as Partial<BrandSettings>);
  } catch (error) {
    console.error('Failed to fetch brand settings:', error);
    return defaultBrandSettings;
  }
};

export const saveBrandSettings = async (settings: BrandSettings): Promise<void> => {
  try {
    await apiPut<unknown>('brand', settings);
  } catch (error) {
    console.error('Failed to save brand settings:', error);
  }
};

export const uploadBrandIcon = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'brand-icons');

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? 'eladmin';

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'X-Admin-Password': adminPassword,
      },
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
  } catch (error) {
    console.error('Brand icon upload failed, using local FileReader fallback:', error);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(typeof reader.result === 'string' ? reader.result : '');
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};
