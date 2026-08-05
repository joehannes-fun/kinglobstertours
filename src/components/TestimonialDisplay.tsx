import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FaStar } from 'react-icons/fa';
import TestimonialForm from './TestimonialForm';
import { getTestimonials, saveTestimonials, TestimonialRecord } from '../services/testimonialService';

interface TestimonialDisplayProps {
  locale: string;
}

const TestimonialDisplay: React.FC<TestimonialDisplayProps> = () => {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTestimonials = async () => {
      const remoteTestimonials = await getTestimonials();
      setTestimonials(remoteTestimonials);
    };
    loadTestimonials();
  }, []);

  const handleTestimonialSubmit = async (name: string, email: string, review: string, profileImage?: string) => {
    setIsSubmitting(true);
    try {
      const newTestimonial: TestimonialRecord = {
        id: Date.now().toString(),
        name,
        email,
        review,
        rating: 5,
        profileImage,
        createdAt: new Date().toISOString().split('T')[0]
      };
      const updated = [newTestimonial, ...testimonials];
      setTestimonials(updated);
      await saveTestimonials(updated);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#FAF7F2] py-24 sm:py-32">
      <div className="section-shell">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            Guest Testimonials & Reviews
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#04131D] sm:text-4xl lg:text-5xl">
            <FormattedMessage id="testimonials.title" />
          </h2>
          <p className="mt-4 text-base font-light text-slate-600 sm:text-lg">
            Unfiltered stories from travelers who experienced the best of Punta Cana with us.
          </p>
        </div>

        {/* Form */}
        <div className="mb-16 max-w-2xl mx-auto">
          <TestimonialForm onSubmit={handleTestimonialSubmit} isLoading={isSubmitting} />
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury-hover"
              >
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < testimonial.rating ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-slate-400">Verified Guest</span>
                  </div>

                  {/* Review */}
                  <blockquote className="font-serif italic text-base leading-relaxed text-slate-700 mb-6">
                    “{testimonial.review}”
                  </blockquote>

                  {/* Host reply written in the admin panel */}
                  {testimonial.adminComment && (
                    <div className="mb-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-teal-700">
                        <FormattedMessage id="testimonials.hostReply" defaultMessage="Our reply" />
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                        {testimonial.adminComment}
                      </p>
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#04131D]">{testimonial.name}</h4>
                    <p className="text-[0.7rem] font-medium text-slate-400">{testimonial.createdAt}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-800">
                    ✓
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
            <p className="text-slate-500 text-sm">
              <FormattedMessage id="testimonials.noTestimonials" />
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialDisplay;
