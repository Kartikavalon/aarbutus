'use client';

import { useState } from 'react';

const fields = [
  ['product', 'Product / grade', 'Molecular sieve 4A, PAC, filter media…'],
  ['quantity', 'Quantity', 'For example: 1 MT or 50 bags/month'],
  ['location', 'Delivery location', 'City and state / country'],
  ['company', 'Company', 'Company name'],
  ['email', 'Business email', 'name@company.com'],
  ['phone', 'Phone', '+91 …'],
];

export default function InquiryForm({ source = 'Website inquiry' }) {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState('');

  function submit(event) {
    event.preventDefault();

    const lines = fields.map(([key, label]) => `${label}: ${values[key] || 'Not provided'}`);
    lines.push(`Application / request details: ${values.details || 'Not provided'}`);
    const subject = `${source}: ${values.product || 'Product inquiry'}`;
    const mailtoLink = `mailto:aarbutustechnologies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    try {
      const popup = window.open(mailtoLink, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.href = mailtoLink;
      }
      setStatus('Opening your email app…');
    } catch {
      window.location.href = mailtoLink;
      setStatus('If the email app did not open, please copy the address manually.');
    }
  }

  return (
    <form className="info-card" onSubmit={submit}>
      <div className="form-grid">
        {fields.map(([key, label, placeholder]) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{label}</label>
            <input id={key} name={key} required={key === 'product' || key === 'email'} value={values[key] || ''} onChange={(event) => setValues({ ...values, [key]: event.target.value })} placeholder={placeholder} />
          </div>
        ))}
      </div>
      <div className="field">
        <label htmlFor="details">Application and technical requirements</label>
        <textarea id="details" name="details" rows="5" value={values.details || ''} onChange={(event) => setValues({ ...values, details: event.target.value })} placeholder="Share the application, target specification, packaging requirement and delivery timeline." />
      </div>
      <button className="btn btn-primary" type="submit">Prepare email inquiry</button>
      <p className="form-note">This opens a pre-filled email to Aarbutus Technologies. You can review it before sending.</p>
      {status ? <p className="form-note" style={{ color: 'var(--blue)' }}>{status}</p> : null}
    </form>
  );
}
