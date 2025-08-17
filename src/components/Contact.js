import React, { useState } from "react";
import Header from "./Header";

const styles = {
  page: {
    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    background: "#f9f9fb",
    color: "#1f2d3a",
    lineHeight: 1.55,
    padding: "0 1rem",
    maxWidth: 1000,
    margin: "0 auto",
  },
  section: {
    marginTop: "2rem",
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "1fr 1fr",
  },
  infoCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  heading: {
    marginTop: 0,
    fontSize: "clamp(1.75rem,2.2vw,2.5rem)",
  },
  subtext: {
    margin: "0.5rem 0 1rem",
    color: "#555",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    minHeight: 140,
    resize: "vertical",
    marginBottom: "1rem",
    outline: "none",
  },
  button: {
    background: "#ff6b35",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
  },
  small: {
    fontSize: "0.85rem",
    color: "#666",
    marginTop: "0.25rem",
  },
  socialRow: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  socialLink: {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eee",
    width: 32,
    height: 32,
    borderRadius: "50%",
    fontSize: "0.9rem",
    color: "#444",
  },
  mapPlaceholder: {
    background: "#e8e8f0",
    borderRadius: 10,
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontSize: "0.9rem",
    marginTop: "1rem",
  },
  error: {
    color: "#c0392b",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  "@media (max-width: 900px)": {
    section: {
      gridTemplateColumns: "1fr",
    },
  },
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (f) => {
    const errs = {};
    if (!f.name.trim()) errs.name = "Name is required.";
    if (!f.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = "Email is invalid.";
    if (!f.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(v).length === 0) {
      // placeholder for real submission logic (e.g., API call)
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.page}>
      <div style={{ paddingTop: "1rem" }}>
        <h1 style={styles.heading}>Contact FoodFortress</h1>
        <p style={styles.subtext}>Have a question, feedback, or need support? We’re here to help.</p>
      </div>

      <div style={styles.section}>
        <div style={styles.infoCard}>
          <div>
            <h2>Get in touch</h2>
            <p style={{ marginTop: 4 }}>Email us directly or send a message using the form. Our support team typically responds within 1 business day.</p>
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Support Email:</strong> <a href="mailto:support@foodfortress.com">support@foodfortress.com</a>
              </p>
              <p>
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Fortress Lane, Cityville, USA
              </p>
            </div>
          </div>
          <div>
            <div style={styles.socialRow}>
              <a aria-label="Twitter" href="#" style={styles.socialLink}>
                T
              </a>
              <a aria-label="Instagram" href="#" style={styles.socialLink}>
                I
              </a>
              <a aria-label="Facebook" href="#" style={styles.socialLink}>
                F
              </a>
            </div>
            <div style={styles.mapPlaceholder} aria-label="Map placeholder">
              Map would go here
            </div>
          </div>
        </div>

        <div style={styles.formCard}>
          <h2>Send us a message</h2>
          {submitted ? (
            <div>
              <p>
                Thank you, <strong>{form.name}</strong>. Your message has been received. We’ll reply to <strong>{form.email}</strong> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  style={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div role="alert" style={styles.error}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  style={styles.input}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div role="alert" style={styles.error}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  style={styles.textarea}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.message && errors.message && (
                  <div role="alert" style={styles.error}>
                    {errors.message}
                  </div>
                )}
              </div>

              <button type="submit" style={styles.button}>
                Send Message
              </button>
              <div style={styles.small}>By submitting, you agree to receive a response from FoodFortress support.</div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
