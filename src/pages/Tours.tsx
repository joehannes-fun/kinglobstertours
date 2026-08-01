import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { HiSearch } from 'react-icons/hi';
import TourCard from '../components/TourCard';
import { Tour, getTours, getServiceSlug } from '../services/toursService';
import { useI18n } from '../contexts/I18nContext';
import { useBrand } from '../contexts/BrandContext';

const Tours: React.FC = () => {
  const { locale } = useI18n();
  const { brandSettings } = useBrand();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadTours();
  }, [locale]);

  const loadTours = async () => {
    setLoading(true);
    const fetchedTours = await getTours(locale);
    setTours(fetchedTours);
    setLoading(false);
  };

  const visibleTours = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return tours;
    return tours.filter((tour) => `${tour.title} ${tour.description}`.toLocaleLowerCase().includes(term));
  }, [query, tours]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-[#0a7280]">Loading your escapes…</div>;
  }

  return (
    <div>
      <section className="listing-hero px-4 py-16 sm:py-20">
        <div className="section-shell relative z-10">
          <p className="site-eyebrow mb-4">Find your kind of day</p>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_25rem]">
            <div>
              <h1 className="mb-3 max-w-3xl text-5xl font-bold leading-[.95] text-[#061d2b] md:text-6xl"><FormattedMessage id="tours.title" /></h1>
              <p className="max-w-2xl text-lg leading-8 text-[#214250]"><FormattedMessage id="tours.dynamicSubtitle" values={{ brand: brandSettings.brandName }} /></p>
            </div>
            <label className="relative block">
              <span className="sr-only">Search experiences</span>
              <HiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0a7280]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="lobster-input w-full py-4 pl-12 pr-4 text-[#061d2b] outline-none" placeholder={locale === 'es' ? 'Buscar una aventura…' : 'Search an experience…'} />
            </label>
          </div>
        </div>
      </section>
      <section className="section-shell py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#214250]">{visibleTours.length} {locale === 'es' ? 'experiencias para explorar' : 'experiences to explore'}</p>
          {query && <button className="text-sm font-bold text-[#0a7280] underline underline-offset-4" onClick={() => setQuery('')}>{locale === 'es' ? 'Limpiar búsqueda' : 'Clear search'}</button>}
        </div>
        {visibleTours.length ? <div className="columns-1 gap-7 sm:columns-2 lg:columns-3">
          {visibleTours.map((tour) => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              pricingOptions={tour.pricingOptions}
              excursionName={tour.title}
              detailsPath={`/details/tours/${getServiceSlug(tour)}`}
            />
          ))}
        </div> : <div className="glass-card p-10 text-center text-[#214250]">{locale === 'es' ? 'No encontramos esa aventura. Prueba otra palabra.' : 'That adventure is not here yet. Try another word.'}</div>}
      </section>
    </div>
  );
};

export default Tours;
