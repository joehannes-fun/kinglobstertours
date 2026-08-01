import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getBrandSettings, saveBrandSettings, BrandSettings, uploadBrandIcon } from '../services/brandService';
import { getTours, saveTours, Tour } from '../services/toursService';
import { useI18n } from '../contexts/I18nContext';
import ServiceAdminPanel from '../components/admin/ServiceAdminPanel';
import TikTokAdmin from '../components/admin/TikTokAdmin';
import SocialMediaAdmin from '../components/admin/SocialMediaAdmin';
import StoryAdmin from '../components/admin/StoryAdmin';
import { FaVideo, FaShareAlt, FaBook } from 'react-icons/fa';
import { setAdminPassword } from '../services/authStore';

const Admin: React.FC = () => {
  const { locale } = useI18n();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandName: 'King Lobster Tours',
    phoneNumber: '+1 (809) 555-0123',
    paypalMeLink: 'https://www.paypal.com/paypalme/tours',
    verifoneLink: '',
    brandicon: '',
  });
  const [editingBrand, setEditingBrand] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [activeSection, setActiveSection] = useState<'brand' | 'tours' | 'transport' | 'story' | 'tiktok' | 'social'>('brand');

  useEffect(() => {
    const fetchBrand = async () => {
      const fetchedBrand = await getBrandSettings();
      setBrandSettings(fetchedBrand);
    };
    fetchBrand();
  }, []);

  const handleBrandIconUpload = async (file: File) => {
    setUploadingIcon(true);
    try {
      const iconUrl = await uploadBrandIcon(file);
      if (iconUrl) {
        setBrandSettings({ ...brandSettings, brandicon: iconUrl });
      }
    } catch (error) {
      console.error('Brand icon upload failed:', error);
    } finally {
      setUploadingIcon(false);
    }
  };

  const triggerBrandIconUpload = () => fileInputRef.current?.click();

  const loadTours = useCallback(async () => {
    const fetchedTours = await getTours(locale);
    setTours(fetchedTours);
  }, [locale]);

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container mx-auto space-y-8 px-4">
        {/* Admin Navigation */}
        <div className="rounded-3xl bg-white p-4 md:p-6 shadow-lg">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                {brandSettings.brandicon ? (
                  <img
                    src={brandSettings.brandicon}
                    alt={`${brandSettings.brandName} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs uppercase tracking-[.2em]">
                    Logo
                  </div>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            <button
              onClick={() => setActiveSection('brand')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeSection === 'brand'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Brand Settings
            </button>
            <button
              onClick={() => setActiveSection('story')}
              className={`px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                activeSection === 'story'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FaBook /> <span>Story</span>
            </button>
            <button
              onClick={() => setActiveSection('tours')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeSection === 'tours'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tours
            </button>
            <button
              onClick={() => setActiveSection('transport')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeSection === 'transport'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Transport
            </button>
            <button
              onClick={() => setActiveSection('tiktok')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeSection === 'tiktok'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              TikTok
            </button>
            <button
              onClick={() => setActiveSection('social')}
              className={`px-4 py-3 rounded-lg font-semibold transition ${
                activeSection === 'social'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Social
            </button>
          </div>
        </div>

        {/* Brand Settings Section */}
        {activeSection === 'brand' && (
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Brand Settings</h2>
            {editingBrand ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Icon</label>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                      {brandSettings.brandicon ? (
                        <img
                          src={brandSettings.brandicon}
                          alt="Brand icon preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs uppercase tracking-[.2em]">
                          No icon
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={triggerBrandIconUpload}
                        disabled={uploadingIcon}
                        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:bg-teal-400"
                      >
                        {uploadingIcon ? 'Uploading…' : 'Upload Brand Icon'}
                      </button>
                      <p className="text-xs text-slate-500">Upload a square logo or brand image to use in the admin menu and site header.</p>
                    </div>
                  </div>
                  <input
                    ref={(ref) => {
                      fileInputRef.current = ref;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        handleBrandIconUpload(file);
                      }
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={brandSettings.brandName}
                  onChange={(event) => setBrandSettings({ ...brandSettings, brandName: event.target.value })}
                  placeholder="Brand Name"
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                />
                <input
                  type="text"
                  value={brandSettings.phoneNumber}
                  onChange={(event) => setBrandSettings({ ...brandSettings, phoneNumber: event.target.value })}
                  placeholder="Phone Number"
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                />
                <input
                  type="text"
                  value={brandSettings.paypalMeLink}
                  onChange={(event) => setBrandSettings({ ...brandSettings, paypalMeLink: event.target.value })}
                  placeholder="PayPal Me Link"
                  className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
                />
                <input
                  type="text"
                  value={brandSettings.verifoneLink}
                  onChange={(event) => setBrandSettings({ ...brandSettings, verifoneLink: event.target.value })}
                  placeholder="Verifone / Additional Link"
                  className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
                />

                {/* Stripe Payment Integration Section */}
                <div className="md:col-span-2 rounded-2xl border border-teal-200 bg-teal-50/50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <span>💳</span> Stripe Payment Gateway Configuration
                      </h4>
                      <p className="text-xs text-slate-600">Enable credit & debit card payments via Stripe</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brandSettings.stripeEnabled ?? false}
                        onChange={(e) => setBrandSettings({ ...brandSettings, stripeEnabled: e.target.checked })}
                        className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm font-bold text-slate-800">Enable Stripe</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Stripe Publishable Key</label>
                      <input
                        type="text"
                        value={brandSettings.stripePublishableKey ?? ''}
                        onChange={(e) => setBrandSettings({ ...brandSettings, stripePublishableKey: e.target.value })}
                        placeholder="pk_live_... or pk_test_..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Stripe Secret Key</label>
                      <input
                        type="password"
                        value={brandSettings.stripeSecretKey ?? ''}
                        onChange={(e) => setBrandSettings({ ...brandSettings, stripeSecretKey: e.target.value })}
                        placeholder="sk_live_... or sk_test_..."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Change Admin Password Section */}
                <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 space-y-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span>🔒</span> Change Admin Password
                  </h4>
                  <p className="text-xs text-slate-600">Update the password required to unlock the Admin Dashboard (default: eladmin)</p>
                  <input
                    type="password"
                    value={brandSettings.customAdminPassword ?? ''}
                    onChange={(e) => setBrandSettings({ ...brandSettings, customAdminPassword: e.target.value })}
                    placeholder="Enter new admin password (leave empty for default 'eladmin')"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
                  />
                </div>

                <div className="flex gap-3 md:col-span-2">
                  <button
                    onClick={async () => {
                      await saveBrandSettings(brandSettings);
                      const newPass = brandSettings.customAdminPassword?.trim();
                      if (newPass) {
                        setAdminPassword(newPass);
                      } else {
                        setAdminPassword('eladmin');
                      }
                      setEditingBrand(false);
                      alert('Brand & Security Settings saved! New admin password is now active.');
                    }}
                    className="rounded-full bg-teal-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-teal-700"
                  >
                    Save Brand & Security Settings
                  </button>
                  <button
                    onClick={() => setEditingBrand(false)}
                    className="rounded-full bg-slate-200 px-6 py-2.5 font-semibold text-slate-800 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-slate-700">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 ring-1 ring-slate-200">
                    {brandSettings.brandicon ? (
                      <img src={brandSettings.brandicon} alt="Brand icon" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs uppercase tracking-[.2em]">
                        No icon
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Top-left admin menu icon</span>
                </div>
                <p><strong>Brand:</strong> {brandSettings.brandName}</p>
                <p><strong>Phone:</strong> {brandSettings.phoneNumber}</p>
                <p><strong>PayPal:</strong> {brandSettings.paypalMeLink}</p>
                <p><strong>Verifone:</strong> {brandSettings.verifoneLink || '—'}</p>
                <button onClick={() => setEditingBrand(true)} className="mt-4 rounded-full bg-blue-600 px-5 py-2 font-semibold text-white">
                  Edit Brand Settings
                </button>
              </div>
            )}
          </div>
        )}

        {/* Story Admin Section */}
        {activeSection === 'story' && <StoryAdmin />}

        {/* Tours Admin Section */}
        {activeSection === 'tours' && (
          <ServiceAdminPanel
            title="Tours Admin"
            category="tours"
            services={tours}
            setServices={setTours}
            loadServices={loadTours}
            saveServices={(services) => saveTours(services, locale)}
            siblingAdminPath="/admin/transport"
            siblingAdminLabel="Go to Transport Admin"
          />
        )}

        {/* Transport Admin Section */}
        {activeSection === 'transport' && (
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-slate-600">Transport Admin Section (navigate from Tours Admin)</p>
          </div>
        )}

        {/* TikTok Videos Admin Panel */}
        {activeSection === 'tiktok' && (
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <FaVideo className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-slate-900">TikTok Videos Admin</h2>
            </div>
            <TikTokAdmin />
          </div>
        )}

        {/* Social Media Admin Panel */}
        {activeSection === 'social' && (
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <FaShareAlt className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-900">Social Media Management</h2>
            </div>
            <SocialMediaAdmin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
