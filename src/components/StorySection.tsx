import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SeaWaveDivider from './ui/SeaWaveDivider';

interface StorySectionProps {
  id: string;
  title: string;
  emoji: string;
  timeframe?: string;
  description: string;
  narrative: string;
  imageUrl?: string;
  vimeoUrl?: string;
  mood?: string;
  isAlternate?: boolean;
  themeName?: string;
}

const StorySection: React.FC<StorySectionProps> = ({
  id,
  title,
  emoji,
  timeframe,
  description,
  narrative,
  imageUrl,
  vimeoUrl,
  mood,
  isAlternate = false,
  themeName,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const isTikTok = vimeoUrl?.includes('tiktok.com');
  const tiktokVideoId = isTikTok ? vimeoUrl?.match(/video\/(\d+)/)?.[1] || vimeoUrl?.split('/').pop()?.split('?')[0] : '';

  useEffect(() => {
    if (isTikTok && isInView && !document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isTikTok, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasLoaded(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasLoaded || !sectionRef.current) return;
    const iframe = sectionRef.current.querySelector('iframe');
    if (!iframe || !iframe.contentWindow) return;

    try {
      if (isInView) {
        if (isTikTok) {
          iframe.contentWindow.postMessage({ 'x-tiktok-player': true, type: 'play' }, '*');
        } else {
          iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        }
      } else {
        if (isTikTok) {
          iframe.contentWindow.postMessage({ 'x-tiktok-player': true, type: 'pause' }, '*');
        } else {
          iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        }
      }
    } catch (e) {
      // Ignore cross-origin errors
    }
  }, [isInView, hasLoaded, isTikTok]);

  const getVimeoAutoplayUrl = (url: string) => {
    if (!url) return '';
    if (isTikTok) return url;
    
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('autoplay', '1');
      urlObj.searchParams.set('loop', '1');
      urlObj.searchParams.set('muted', '1');
      urlObj.searchParams.set('background', '1');
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`home-section relative overflow-hidden px-4 py-24 sm:py-32 md:px-8 ${
        themeName ? themeName : isAlternate ? 'bg-[#F4EFE6]/60 backdrop-blur-[6px]' : 'bg-[#FAF7F2]/50 backdrop-blur-[6px]'
      }`}
    >
      <div className="section-shell relative z-10">
        {/* Header with editorial artsy kicker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-14 max-w-3xl ${isAlternate ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'}`}
        >
          <div className={`mb-5 flex items-center gap-3 ${isAlternate ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-2xl drop-shadow-md">{emoji || '✦'}</span>
            {timeframe && (
              <span className={isAlternate ? 'artsy-brick-badge-inverted' : 'artsy-brick-badge'}>
                {timeframe}
              </span>
            )}
          </div>

          {title && (
            <h2 className="font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#04131D] sm:text-4xl lg:text-5xl drop-shadow-sm">
              {title}
            </h2>
          )}

          <div className={`mt-5 h-1.5 w-24 bg-gradient-to-r from-teal-500 via-cyan-400 to-amber-400 rounded-full shadow-md ${isAlternate ? 'md:ml-auto' : ''}`} />
        </motion.div>

        {/* Main content grid */}
        <div className={`grid items-center gap-12 ${imageUrl || vimeoUrl ? 'md:grid-cols-2 lg:gap-16' : 'md:grid-cols-1'}`}>
          {/* Text content */}
          <div className={(imageUrl || vimeoUrl) && isAlternate ? 'md:order-2' : 'md:order-1'}>
            {description && (
              <div
                className={`mb-8 p-8 sm:p-9 border-2 border-white/80 backdrop-blur-[6px] shadow-[0_25px_60px_rgba(6,29,43,0.16),6px_6px_0px_rgba(4,19,29,0.85)] transition-transform hover:-translate-y-1 ${
                  isAlternate
                    ? 'bg-gradient-to-br from-white/70 via-amber-50/50 to-teal-50/40 rounded-[2.8rem] rounded-tr-md'
                    : 'bg-gradient-to-br from-white/80 via-cyan-50/40 to-slate-50/60 rounded-[2.8rem] rounded-tl-md'
                }`}
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed text-[#04131D] sm:text-lg font-normal">
                  {description}
                </p>
              </div>
            )}

            {narrative && (
              <div className="relative overflow-hidden rounded-[2.2rem] border-2 border-amber-400/50 bg-[#04131D] p-7 text-white shadow-[6px_6px_0px_#0d9488,0_20px_45px_rgba(4,19,29,0.4)]">
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-teal-400/20 to-transparent pointer-events-none" />
                <p className="font-serif text-base italic leading-relaxed text-slate-100 sm:text-lg">
                  “{narrative}”
                </p>
              </div>
            )}

            {mood && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {mood.split(', ').filter(Boolean).map((m, idx) => (
                  <span
                    key={idx}
                    className="artsy-brick-badge-inverted"
                  >
                    ✦ {m}
                  </span>
                ))}
              </div>
            )}

            {vimeoUrl && imageUrl && (
              <div className="mt-8 story-media-frame flex justify-center w-full">
                {isTikTok ? (
                  hasLoaded ? (
                    <div className="relative z-10 w-full overflow-hidden rounded-3xl border-2 border-white/80 shadow-2xl">
                      <blockquote
                        className="tiktok-embed"
                        cite={vimeoUrl}
                        data-video-id={tiktokVideoId}
                        style={{ maxWidth: "605px", minWidth: "325px", margin: "0 auto" }}
                      >
                        <section></section>
                      </blockquote>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">Loading Video...</div>
                  )
                ) : (
                  <iframe
                    src={isInView ? getVimeoAutoplayUrl(vimeoUrl) : vimeoUrl}
                    className="relative w-full aspect-video rounded-3xl shadow-2xl border-2 border-white/80"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            )}
          </div>

          {/* Media Column - Asymmetrical playful corners & thick contrast border */}
          {(imageUrl || (!imageUrl && vimeoUrl)) && (
            <div className={`${isAlternate ? 'md:order-1' : 'md:order-2'}`}>
              <div className={`relative overflow-hidden p-3 border-2 border-white/90 bg-white/50 backdrop-blur-[6px] shadow-[0_30px_70px_rgba(4,19,29,0.25),8px_8px_0px_#04131D] transition-transform duration-500 hover:scale-[1.02] ${
                isAlternate ? 'rounded-[3rem] rounded-tr-md rotate-1' : 'rounded-[3rem] rounded-tl-md -rotate-1'
              }`}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || 'Story image'}
                    className="h-80 w-full rounded-[2.3rem] object-cover shadow-md sm:h-96 md:h-[470px]"
                  />
                ) : isTikTok ? (
                  hasLoaded ? (
                    <div className="relative z-10 flex justify-center w-full overflow-hidden rounded-[2.3rem]">
                      <blockquote
                        className="tiktok-embed"
                        cite={vimeoUrl}
                        data-video-id={tiktokVideoId}
                        style={{ maxWidth: "605px", minWidth: "325px", margin: "0 auto" }}
                      >
                        <section></section>
                      </blockquote>
                    </div>
                  ) : (
                     <div className="h-80 w-full rounded-[2.3rem] bg-slate-100 flex items-center justify-center text-slate-400 sm:h-96 md:h-[470px]">Loading TikTok...</div>
                  )
                ) : (
                  <iframe
                    src={isInView ? getVimeoAutoplayUrl(vimeoUrl) : vimeoUrl}
                    className="h-80 w-full rounded-[2.3rem] shadow-md sm:h-96 md:h-[470px]"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wavy Sea Waves Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 -mb-1 opacity-60">
        <SeaWaveDivider
          variant={isAlternate ? 'swell' : 'tide'}
          colorClass="text-teal-900/15"
        />
      </div>
    </section>
  );
};

export default StorySection;
