import React, { useEffect, useState } from 'react';
import { FaStar, FaTrash, FaCommentDots, FaSync } from 'react-icons/fa';
import {
  getTestimonials,
  deleteTestimonial,
  setTestimonialComment,
  TestimonialRecord,
} from '../../services/testimonialService';

const TestimonialsAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const syncDrafts = (records: TestimonialRecord[]) => {
    setDrafts(
      records.reduce<Record<string, string>>((accumulator, record) => {
        accumulator[record.id] = record.adminComment ?? '';
        return accumulator;
      }, {})
    );
  };

  const loadTestimonials = async () => {
    setLoading(true);
    const records = await getTestimonials();
    setTestimonials(records);
    syncDrafts(records);
    setLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (testimonial: TestimonialRecord) => {
    const confirmed = window.confirm(
      `Delete the testimonial from ${testimonial.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    setBusyId(testimonial.id);
    try {
      const remaining = await deleteTestimonial(testimonials, testimonial.id);
      setTestimonials(remaining);
      syncDrafts(remaining);
      setStatus(`Deleted the testimonial from ${testimonial.name}.`);
    } finally {
      setBusyId(null);
    }
  };

  const handleSaveComment = async (testimonial: TestimonialRecord) => {
    setBusyId(testimonial.id);
    try {
      const updated = await setTestimonialComment(
        testimonials,
        testimonial.id,
        drafts[testimonial.id] ?? ''
      );
      setTestimonials(updated);
      syncDrafts(updated);
      setStatus(
        (drafts[testimonial.id] ?? '').trim()
          ? `Reply saved for ${testimonial.name}.`
          : `Reply removed for ${testimonial.name}.`
      );
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <p className="text-slate-500">Loading testimonials…</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {testimonials.length} testimonial{testimonials.length === 1 ? '' : 's'} published. Delete
          the ones you do not want on the site, or reply publicly to a guest.
        </p>
        <button
          onClick={loadTestimonials}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          <FaSync /> Reload
        </button>
      </div>

      {status && (
        <p className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
          {status}
        </p>
      )}

      {testimonials.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
          No testimonials yet.
        </p>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{testimonial.name}</h3>
                  <p className="text-xs text-slate-500">
                    {testimonial.email} · {testimonial.createdAt}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`h-3.5 w-3.5 ${
                          idx < testimonial.rating ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(testimonial)}
                  disabled={busyId === testimonial.id}
                  className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                >
                  <FaTrash className="h-3.5 w-3.5" /> Delete
                </button>
              </div>

              <blockquote className="mt-4 rounded-xl bg-slate-50 p-4 text-sm italic text-slate-700">
                “{testimonial.review}”
              </blockquote>

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <FaCommentDots className="text-teal-600" /> Public reply
                </label>
                <textarea
                  value={drafts[testimonial.id] ?? ''}
                  onChange={(event) =>
                    setDrafts({ ...drafts, [testimonial.id]: event.target.value })
                  }
                  rows={3}
                  placeholder="Thank the guest or answer their feedback. Shown under the review on the website."
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSaveComment(testimonial)}
                    disabled={busyId === testimonial.id}
                    className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50"
                  >
                    {busyId === testimonial.id ? 'Saving…' : 'Save reply'}
                  </button>
                  {testimonial.adminComment && (
                    <span className="text-xs text-slate-500">
                      Published reply from {testimonial.adminCommentAt ?? '—'}. Clear the field and
                      save to remove it.
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;
