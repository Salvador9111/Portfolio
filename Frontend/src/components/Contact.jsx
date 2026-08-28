import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.';
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
        const response = await fetch("https://formspree.io/f/mqpzaqqy", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(formData) });
        if (response.ok) { setSubmitted(true); setFormData({ name: "", email: "", message: "" }); } else { alert("Failed to send message."); }
      } catch (e) { console.error(e); alert("Something went wrong."); } finally { setIsSubmitting(false); }
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="editorial-badge">
            <span className="editorial-line"></span>
            <span className="label-caps">05 / GET IN TOUCH</span>
          </div>
          <h2 className="section-editorial-title" style={{ fontWeight: 800 }}>
            LET'S COLLABORATE
          </h2>
          <p className="body-large" style={{ marginTop: '12px', maxWidth: '620px' }}>
            Open to internship opportunities, technical collaborations, project evaluations, and professional discussions.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '36px'
          }}
          className="contact-editorial-grid"
        >
          {/* Left Column: Direct Info Card */}
          <div
            className="greensward-card"
            style={{
              padding: '36px',
              backgroundColor: 'var(--color-surface)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '24px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '16px', fontWeight: 400 }}>
                Direct Communication
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
                Feel free to email me directly, call, or send a message through the form. I aim to respond to technical inquiries within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                <a
                  href={`mailto:${personal.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'var(--color-text)',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '50%',
                      color: '#FFFFFF'
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>
                      EMAIL ADDRESS
                    </span>
                    <strong>{personal.email}</strong>
                  </div>
                </a>

                {personal.phone && (
                  <a
                    href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  >
                    <div
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '50%',
                        color: '#FFFFFF'
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>
                        PHONE NUMBER
                      </span>
                      <strong>{personal.phone}</strong>
                    </div>
                  </a>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: 'var(--color-text)',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '50%',
                      color: '#FFFFFF'
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block' }}>
                      LOCATION
                    </span>
                    <strong>{personal.location}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', display: 'block', marginBottom: '12px' }}>
                PROFESSIONAL NETWORKS
              </span>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Github size={15} />
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#FFFFFF',
                    color: '#08080A',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    border: '2px solid #FFFFFF',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E4E4E7';
                    e.currentTarget.style.borderColor = '#E4E4E7';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 255, 255, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Download size={14} />
                  View Resume
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Validated Contact Form */}
          <div
            className="greensward-card"
            style={{
              padding: '36px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px'
            }}
          >
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', fontWeight: 400 }}>
              Send a Message
            </h3>

            {submitted ? (
              <div
                style={{
                  padding: '28px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '18px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <CheckCircle2 size={38} color="#FFFFFF" />
                <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontWeight: 400 }}>
                  Message Delivered
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.6 }}>
                  Thank you for reaching out. Your message has been sent to Hammad, and he will reply shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '12px' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hammad Imran"
                    style={{
                      width: '94%',
                      maxWidth: '480px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: errors.name ? '1px solid #FFFFFF' : '1px solid var(--color-border)',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      backgroundColor: 'var(--color-surface-muted)',
                      color: 'var(--color-text)'
                    }}
                  />
                  {errors.name && (
                    <span style={{ fontSize: '0.8rem', color: '#FFFFFF', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. hammad.a.work@gmail.com"
                    style={{
                      width: '94%',
                      maxWidth: '480px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: errors.email ? '1px solid #FFFFFF' : '1px solid var(--color-border)',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      backgroundColor: 'var(--color-surface-muted)',
                      color: 'var(--color-text)'
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '0.8rem', color: '#FFFFFF', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '8px' }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, internship opportunity, or collaboration request..."
                    style={{
                      width: '94%',
                      maxWidth: '480px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: errors.message ? '1px solid #FFFFFF' : '1px solid var(--color-border)',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      backgroundColor: 'var(--color-surface-muted)',
                      color: 'var(--color-text)',
                      resize: 'vertical'
                    }}
                  />
                  {errors.message && (
                    <span style={{ fontSize: '0.8rem', color: '#FFFFFF', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '94%', maxWidth: '480px', marginTop: '6px' }}
                >
                  {isSubmitting ? (
                    'Sending Message...'
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .contact-editorial-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </section>
  );
}