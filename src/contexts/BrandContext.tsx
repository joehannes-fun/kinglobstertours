import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getBrandSettings, defaultBrandSettings, BrandSettings } from '../services/brandService';

interface BrandContextType {
  brandSettings: BrandSettings;
  setBrandSettings: (settings: BrandSettings) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
  children: ReactNode;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({ children }) => {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(defaultBrandSettings);

  useEffect(() => {
    const fetchBrand = async () => {
      const settings = await getBrandSettings();
      setBrandSettings(settings);
    };
    fetchBrand();
  }, []);

  return (
    <BrandContext.Provider value={{ brandSettings, setBrandSettings }}>
      {children}
    </BrandContext.Provider>
  );
};
