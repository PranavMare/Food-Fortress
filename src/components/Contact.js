import React, { useState } from "react";

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
    if (touched[name]) setErrors(validate({ ...form, [name]: value }));
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
    if (Object.keys(v).length === 0) setSubmitted(true);
  };

  const inputBase = "block w-full rounded-lg border bg-white px-3 py-2 text-base outline-none transition placeholder:text-slate-400";
  const okFocus = "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 border-slate-300";
  const errFocus = "border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact Food Fortress</h1>
          <p className="mt-2 text-slate-600">Have a question, feedback, or need support? We’re here to help.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {/* Info card */}
          <aside className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5">
            <div>
              <h2 className="text-xl font-semibold">Get in touch</h2>
              <p className="mt-1.5 text-slate-600">
                Email us directly or send a message using the form. Our support team typically responds within 1 business day.
              </p>

              <dl className="mt-4 space-y-2 text-slate-700">
                <div className="flex gap-2">
                  <dt className="font-semibold w-32">Support Email:</dt>
                  <dd>
                    <a href="mailto:support@foodfortress.com" className="text-orange-600 hover:text-orange-700 underline underline-offset-2">
                      support@foodfortress.com
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold w-32">Phone:</dt>
                  <dd>(555) 123-4567</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold w-32">Address:</dt>
                  <dd>123 Fortress Lane, Cityville, USA</dd>
                </div>
              </dl>
            </div>

            <div>
              <div className="mt-4 flex gap-2">
                <a
                  aria-label="Twitter"
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  T
                </a>
                <a
                  aria-label="Instagram"
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  I
                </a>
                <a
                  aria-label="Facebook"
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  F
                </a>
              </div>

              <div aria-label="Map placeholder" className="mt-4 grid h-56 place-items-center rounded-lg bg-slate-100 text-sm text-slate-500">
                Map would go here
              </div>
            </div>
          </aside>

          {/* Form card */}
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/5">
            <h2 className="text-xl font-semibold">Send us a message</h2>

            {submitted ? (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <p>
                  Thank you, <strong>{form.name}</strong>. Your message has been received. We’ll reply to <strong>{form.email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={`${inputBase} ${errors.name && touched.name ? errFocus : okFocus}`}
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputBase} ${errors.email && touched.email ? errFocus : okFocus}`}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    id="message"
                    name="message"
                    placeholder="How can we help?"
                    className={`${inputBase} min-h-36 resize-y ${errors.message && touched.message ? errFocus : okFocus}`}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 active:scale-[.99]"
                >
                  Send Message
                </button>

                <p className="text-sm text-slate-500">By submitting, you agree to receive a response from FoodFortress support.</p>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
