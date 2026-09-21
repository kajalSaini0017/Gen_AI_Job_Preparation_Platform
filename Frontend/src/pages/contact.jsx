import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiClock, FiSend } from 'react-icons/fi';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email us',
      value: 'support@genaiprep.com',
      description: 'We usually reply within 24 hours.',
    },
    {
      icon: FiPhone,
      title: 'Call us',
      value: '+1 (555) 249-8800',
      description: 'Mon-Fri • 9:00 AM - 6:00 PM',
    },
    {
      icon: FiMapPin,
      title: 'Visit us',
      value: '123 Career Lane, San Francisco, CA',
      description: 'Meet with our support team on campus.',
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 px-3 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-20">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
            Contact us
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            We&apos;re here to help you grow
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Have questions about interview prep, pricing, or platform features? Reach out and our team will get back to you soon.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-5 text-white shadow-xl sm:p-7 lg:p-8">
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-100">Let&apos;s connect</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Talk to our team</h2>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, title, value, description }) => (
                <div key={title} className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm sm:gap-4 sm:p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg sm:h-12 sm:w-12">
                    <Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-indigo-100">{title}</p>
                    <p className="mt-1 break-words text-sm font-semibold text-white sm:text-base">{value}</p>
                    <p className="mt-1 break-words text-xs text-indigo-100 sm:text-sm">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/10 p-3 text-xs text-indigo-50 sm:items-center sm:p-4 sm:text-sm">
              <FiClock className="mt-0.5 shrink-0 text-lg sm:mt-0" />
              <span className="min-w-0">Average response time: within 24 hours</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Interview preparation"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:w-auto"
              >
                Send message
                <FiSend />
              </button>
            </form>

            {isSubmitted && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                Your message has been sent successfully. We&apos;ll get back to you shortly.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
