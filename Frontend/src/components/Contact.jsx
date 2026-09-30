import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import './ContactBook.css';

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occasion: 'A project',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const occasions = [
    { label: 'A project', value: 'a project' },
    { label: 'An AI solution', value: 'an AI solution' },
    { label: 'An editorial', value: 'an editorial' },
    { label: 'Just hello', value: 'just hello' }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.notes.trim()) {
      errs.notes = 'Please leave a note or details.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://formspree.io/f/mqpzaqqy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            occasion: formData.occasion,
            message: `[Occasion: ${formData.occasion}]\n\n${formData.notes}`
          })
        });

        if (response.ok) {
          setSubmitted(true);
          // Optional mailto backup trigger
          const subject = encodeURIComponent(`Enquiry: ${formData.occasion}`);
          const body = encodeURIComponent(
            `Hello, I'm ${formData.name}.\n\nI'd like to talk about ${formData.occasion}.\n\n${formData.notes}\n\nReply to: ${formData.email}`
          );
          setTimeout(() => {
            window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
          }, 1200);
        } else {
          // Fallback to mailto directly if Formspree quota is reached
          setSubmitted(true);
          const subject = encodeURIComponent(`Enquiry: ${formData.occasion}`);
          const body = encodeURIComponent(
            `Hello, I'm ${formData.name}.\n\nI'd like to talk about ${formData.occasion}.\n\n${formData.notes}\n\nReply to: ${formData.email}`
          );
          window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
        }
      } catch (err) {
        console.error("Form error:", err);
        setSubmitted(true);
        const subject = encodeURIComponent(`Enquiry: ${formData.occasion}`);
        const body = encodeURIComponent(
          `Hello, I'm ${formData.name}.\n\nI'd like to talk about ${formData.occasion}.\n\n${formData.notes}\n\nReply to: ${formData.email}`
        );
        window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="black-book-section" aria-label="Contact Section">
      {/* Header */}
      <header className="black-book-header">
        <div className="editorial-badge" style={{ marginBottom: '14px', justifyContent: 'center' }}>
          <span className="editorial-line"></span>
          <span className="label-caps">05 / GET IN TOUCH</span>
          <span className="editorial-line"></span>
        </div>
        <h1 className="black-book-h1">Get yourself into my little black book.</h1>
        <p>Selective, yes. But always curious. Tell me who you are and what you have in mind.</p>
      </header>

      {/* The Open Book */}
      <div className="book">
        <div className="cover">
          {/* Left Page: Find Me */}
          <section className="pg left" aria-label="Contact details">
            <h2 className="t">Find me</h2>

            <div className="ent">
              <span className="k">Email</span>
              <a className="v" href={`mailto:${personal.email}`}>
                {personal.email}
              </a>
            </div>

            <div className="ent">
              <span className="k">LinkedIn</span>
              <a
                className="v"
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                /in/hammad-imran
              </a>
            </div>

            <div className="ent">
              <span className="k">GitHub</span>
              <a
                className="v"
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Salvador9111
              </a>
            </div>

            {personal.phone && (
              <div className="ent">
                <span className="k">Phone</span>
                <a className="v" href={`tel:${personal.phone.replace(/\s+/g, '')}`}>
                  {personal.phone}
                </a>
              </div>
            )}

            <div className="ent">
              <span className="k">Resume</span>
              <a
                className="v"
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume ↗
              </a>
            </div>

            <div className="ent">
              <span className="k">Based in</span>
              <span className="v">{personal.location}, available worldwide</span>
            </div>

            <div className="ent">
              <span className="k">Hours</span>
              <span className="v d">Weekdays, 10 to 6. Evenings for emergencies and builds.</span>
            </div>

            <p className="note">Replies within two working days. Sooner if it's intriguing.</p>
            <div className="folio">page 1</div>
          </section>

          {/* Right Page: Add Yourself */}
          <section className="pg right" aria-label="Contact form">
            {/* Crimson Ribbon Bookmark */}
            <div className="ribbon" aria-hidden="true" />

            {/* Edge Index Alphabet Tabs */}
            <div className="tabs" aria-hidden="true">
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span>G</span>
            </div>

            <h2 className="t">Add yourself</h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="f">
                <label htmlFor="n">Name</label>
                <input
                  id="n"
                  type="text"
                  placeholder="First and last"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className="book-form-error">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="f">
                <label htmlFor="e">Email</label>
                <input
                  id="e"
                  type="email"
                  placeholder="Where I can reach you"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="book-form-error">{errors.email}</span>}
              </div>

              {/* Occasion Chips */}
              <fieldset>
                <span className="lab">Occasion</span>
                <div className="chips">
                  {occasions.map((occ) => (
                    <label key={occ.value}>
                      <input
                        type="radio"
                        name="occasion"
                        value={occ.value}
                        checked={formData.occasion === occ.value}
                        onChange={() => setFormData({ ...formData, occasion: occ.value })}
                      />
                      <span>{occ.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Notes Field (Lined Notebook Paper Effect) */}
              <div className="f">
                <label htmlFor="m">Notes</label>
                <textarea
                  id="m"
                  placeholder="Details, deadlines, daydreams."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
                {errors.notes && <span className="book-form-error">{errors.notes}</span>}
              </div>

              {/* Submit Button */}
              <div className="book-btn-wrap">
                <button
                  id="go"
                  type="submit"
                  className="book-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding to the book...' : 'Add me to the book'}
                </button>
              </div>

              {/* Rubber Stamp & Confirmation Status */}
              {submitted && (
                <>
                  <p className="ok" id="ok" role="status">
                    Noted. You're in the book now.
                  </p>
                  <div className="stamp" id="st" aria-hidden="true">
                    Noted
                  </div>
                </>
              )}
            </form>

            <div className="folio">page 2</div>
          </section>
        </div>
      </div>
    </section>
  );
}