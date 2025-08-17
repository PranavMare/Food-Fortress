import React from "react";
import Header from "./Header";

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 1rem",
    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    color: "#1f2d3a",
    lineHeight: 1.55,
    background: "#f9f9fb",
  },
  header: {
    textAlign: "center",
    padding: "2rem 0 1rem",
  },
  badge: {
    display: "inline-block",
    background: "#ff6b35",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "0.5rem",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.8rem,2.5vw,3rem)",
  },
  lead: {
    margin: "0.5rem 0 1.5rem",
    fontSize: "1.1rem",
    color: "#555",
  },
  gridTwo: {
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    marginBottom: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.5rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  howContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  howStep: {
    flex: "1 1 200px",
    background: "#fff",
    borderRadius: 10,
    padding: "1rem",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    paddingTop: "1.5rem",
  },
  stepDot: {
    position: "absolute",
    top: -12,
    left: -12,
    background: "#ff6b35",
    color: "#fff",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  teamGrid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    marginTop: "1rem",
  },
  member: {
    textAlign: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 8,
    background: "#e0e0e8",
    display: "inline-block",
  },
  testimonials: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    marginTop: "1rem",
  },
  testimonial: {
    background: "#fff",
    padding: "1rem 1.25rem",
    borderRadius: 10,
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    fontSize: "0.95rem",
  },
  cta: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  button: {
    display: "inline-block",
    background: "#ff6b35",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
  },
  contact: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginTop: "1rem",
  },
  contactInfo: {
    flex: "1 1 220px",
  },
  footer: {
    marginTop: "3rem",
    padding: "2rem 0",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#666",
  },
  social: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  socialLink: {
    textDecoration: "none",
    display: "inline-block",
    background: "#eee",
    padding: "8px",
    borderRadius: "50%",
    fontSize: "0.9rem",
    width: 32,
    height: 32,
    lineHeight: 1,
    textAlign: "center",
    color: "#444",
  },
};

function About() {
  return (
    <div>
      <div style={styles.container}>
        <header style={styles.header} aria-label="About FoodFortress">
          <div style={styles.badge} aria-label="Our mission">
            Our Mission
          </div>
          <h1 style={styles.title}>FoodFortress: Fresh Food, Fast</h1>
          <p style={styles.lead}>We connect hungry people with their favorite local restaurants, delivering delicious meals quickly and reliably.</p>
        </header>

        <section aria-label="Mission and values" style={styles.gridTwo}>
          <div style={styles.card}>
            <h2>Who We Are</h2>
            <p>
              FoodFortress was founded to solve the pain of long waits and cold deliveries. We blend technology with local flavor to give customers a seamless
              food experience—order in seconds, savor in minutes.
            </p>
          </div>
          <div style={styles.card}>
            <h2>Our Values</h2>
            <ul>
              <li>
                <strong>Speed:</strong> Delivering meals quickly without compromising quality.
              </li>
              <li>
                <strong>Transparency:</strong> Real-time tracking, honest pricing.
              </li>
              <li>
                <strong>Local Support:</strong> Empowering neighborhood restaurants.
              </li>
              <li>
                <strong>Customer-first:</strong> Every order matters.
              </li>
            </ul>
          </div>
        </section>

        <section aria-label="How it works" style={{ marginBottom: "2rem" }}>
          <div style={styles.card}>
            <h2>How It Works</h2>
            <div style={styles.howContainer} aria-label="Steps to order">
              {[
                {
                  step: 1,
                  title: "Browse",
                  desc: "Choose from curated local restaurants and menus tailored to your taste.",
                },
                {
                  step: 2,
                  title: "Order",
                  desc: "Customize your meal, select delivery time, and checkout securely.",
                },
                {
                  step: 3,
                  title: "Track",
                  desc: "Watch your order in real time from kitchen to doorstep.",
                },
                {
                  step: 4,
                  title: "Enjoy",
                  desc: "Receive fresh food and savor every bite. Rate your experience.",
                },
              ].map((s) => (
                <div key={s.step} style={styles.howStep}>
                  <div style={styles.stepDot}>{s.step}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Our team" style={{ marginBottom: "2rem" }}>
          <div style={styles.card}>
            <h2>Meet the Team</h2>
            <p>Small but mighty—builders, food lovers, and technologists committed to better delivery.</p>
            <div style={styles.teamGrid} aria-label="Team members">
              {[
                { name: "Jane Doe", role: "CEO & Founder" },
                { name: "Carlos Ramirez", role: "CTO" },
                { name: "Amina Patel", role: "Head of Operations" },
                { name: "Liu Wei", role: "Customer Experience" },
              ].map((m) => (
                <div key={m.name} style={styles.member}>
                  <div>
                    <img style={styles.avatar} src="https://via.placeholder.com/80" alt={`${m.name}, ${m.role}`} />
                  </div>
                  <div>
                    <strong>{m.name}</strong>
                  </div>
                  <div>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Testimonials" style={{ marginBottom: "2rem" }}>
          <div style={styles.card}>
            <h2>What Our Customers Say</h2>
            <div style={styles.testimonials}>
              {[
                {
                  quote: "FoodFortress gets my lunch to me in under 20 minutes, and everything arrives hot. Game changer for busy days.",
                  by: "Malik, Software Engineer",
                },
                {
                  quote: "I love supporting local restaurants. The app makes discovery and ordering effortless.",
                  by: "Priya, Designer",
                },
                {
                  quote: "The real-time tracking is so accurate. I know exactly when to be ready.",
                  by: "Tony, Student",
                },
              ].map((t, i) => (
                <div key={i} style={styles.testimonial}>
                  <p>{t.quote}</p>
                  <div style={{ marginTop: 8 }}>
                    <strong>— {t.by}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Call to action" style={styles.cta}>
          <div style={styles.card}>
            <h2>Ready to Eat?</h2>
            <p style={styles.lead}>Join thousands of happy customers getting food delivered faster and fresher.</p>
            <button style={styles.button} aria-label="Sign up now">
              Get Started
            </button>
          </div>
        </section>

        <section aria-label="Contact us" style={{ marginBottom: "2rem" }}>
          <div style={styles.card}>
            <h2>Contact & Support</h2>
            <div style={styles.contact}>
              <div style={styles.contactInfo}>
                <h3>Customer Support</h3>
                <p>
                  Email: <a href="mailto:support@foodfortress.com">support@foodfortress.com</a>
                </p>
                <p>Phone: (555) 123-4567</p>
              </div>
              <div style={styles.contactInfo}>
                <h3>Follow Us</h3>
                <div style={styles.social} aria-label="Social media links">
                  <a style={styles.socialLink} href="#" aria-label="Twitter">
                    T
                  </a>
                  <a style={styles.socialLink} href="#" aria-label="Instagram">
                    I
                  </a>
                  <a style={styles.socialLink} href="#" aria-label="Facebook">
                    F
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={styles.footer}>
          <p>
            &copy; 2025 FoodFortress Inc. All rights reserved. <br />
            Built with love for food lovers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
