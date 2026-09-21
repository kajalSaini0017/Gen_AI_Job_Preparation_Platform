function Footer() {
  const links = {
    platform: ["About", "Courses", "Career Paths", "Job Board"],
    company: ["Blog", "Community", "Success Stories", "Partners"],
    support: ["Help Center", "Contact", "Privacy Policy", "Terms"],
  };

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="text-cyan-500">Gen</span>AI
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Learn job-ready AI skills, build projects, and prepare for tomorrow’s opportunities.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {links.platform.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-500 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {links.company.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-500 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {links.support.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-500 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:text-sm">
          <p>© 2026 GenAI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-500 transition-colors duration-200">LinkedIn</a>
            <a href="#" className="hover:text-cyan-500 transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-cyan-500 transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;