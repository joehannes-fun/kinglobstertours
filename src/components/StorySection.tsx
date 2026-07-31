import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
        themeName ? themeName : isAlternate ? 'bg-[#F4EFE6]' : 'bg-[#FAF7F2]'
      }`}
    >
      <div className="section-shell relative z-10">
        {/* Header with editorial kicker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-12 max-w-3xl ${isAlternate ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'}`}
        >
          <div className={`mb-4 flex items-center gap-3 ${isAlternate ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-xl">{emoji || '✦'}</span>
            {timeframe && (
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                {timeframe}
              </span>
            )}
          </div>

          {title && (
            <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#04131D] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}

          <div className={`mt-4 h-0.5 w-16 bg-teal-600/40 ${isAlternate ? 'md:ml-auto' : ''}`} />
        </motion.div>

        {/* Main content grid */}
        <div className={`grid items-center gap-12 ${imageUrl || vimeoUrl ? 'md:grid-cols-2 lg:gap-16' : 'md:grid-cols-1'}`}>
          {/* Text content */}
          <div className={(imageUrl || vimeoUrl) && isAlternate ? 'md:order-2' : 'md:order-1'}>
            {description && (
              <div className="story-copy-card mb-6 p-7 sm:p-8">
                <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 sm:text-lg font-light">
                  {description}
                </p>
              </div>
            )}

            {narrative && (
              <div className="pl-4 border-l-2 border-teal-500/40">
                <p className="font-serif text-base italic leading-relaxed text-slate-600 sm:text-lg">
                  “{narrative}”
                </p>
              </div>
            )}

            {mood && (
              <div className="mt-8 flex flex-wrap gap-2">
                {mood.split(', ').filter(Boolean).map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 border border-slate-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {vimeoUrl && imageUrl && (
              <div className="mt-8 story-media-frame flex justify-center w-full">
                {isTikTok ? (
                  hasLoaded ? (
                    <div className="relative z-10 w-full overflow-hidden rounded-2xl">
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
                    <div className="relative w-full aspect-video rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">Loading Video...</div>
                  )
                ) : (
                  <iframe
                    src={isInView ? getVimeoAutoplayUrl(vimeoUrl) : vimeoUrl}
                    className="relative w-full aspect-video rounded-2xl shadow-xl"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            )}
          </div>

          {/* Media Column */}
          {(imageUrl || (!imageUrl && vimeoUrl)) && (
            <div className={`${isAlternate ? 'md:order-1' : 'md:order-2'}`}>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2 shadow-luxury">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || 'Story image'}
                    className="h-80 w-full rounded-2xl object-cover shadow-sm sm:h-96 md:h-[460px]"
                  />
                ) : isTikTok ? (
                  hasLoaded ? (
                    <div className="relative z-10 flex justify-center w-full overflow-hidden rounded-2xl">
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
                     <div className="h-80 w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 sm:h-96 md:h-[460px]">Loading TikTok...</div>
                  )
                ) : (
                  <iframe
                    src={isInView ? getVimeoAutoplayUrl(vimeoUrl) : vimeoUrl}
                    className="h-80 w-full rounded-2xl shadow-sm sm:h-96 md:h-[460px]"
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
