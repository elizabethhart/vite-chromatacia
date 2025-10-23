// Removed WordCloud import and data - replaced with simpler design

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="text-center mb-16 animate-fade-in"
        aria-labelledby="hero-title"
      >
        <h1
          id="hero-title"
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent animate-slide-up"
        >
          Welcome to Chromatacia
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto animate-slide-up">
          A modern showcase of technology, creativity, and innovation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <a
            href="/bookshelf"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Explore Bookshelf
          </a>
          <a
            href="/about"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Learn More
          </a>
        </div>
      </section>

      {/* This Application's Technology Stack */}
      <section
        className="card p-8 mb-16 animate-scale-in"
        aria-labelledby="tech-title"
      >
        <div className="text-center mb-8">
          <h2
            id="tech-title"
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
          >
            Built With
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Technologies and tools used to build this application
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          role="list"
          aria-label="Technology stack"
        >
          {[
            { name: "React", color: "from-cyan-500 to-cyan-600" },
            { name: "TypeScript", color: "from-blue-500 to-blue-600" },
            { name: "Vite", color: "from-purple-500 to-purple-600" },
            { name: "Tailwind", color: "from-teal-500 to-teal-600" },
            { name: "Cloudflare", color: "from-orange-500 to-orange-600" },
            { name: "Google Books API", color: "from-red-500 to-red-600" },
            { name: "React Query", color: "from-pink-500 to-pink-600" },
            { name: "React Router", color: "from-indigo-500 to-indigo-600" },
          ].map((tech, index) => (
            <div
              key={tech.name}
              className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
              aria-label={`${tech.name} technology`}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                aria-hidden="true"
              >
                <span className="text-white font-bold text-sm">
                  {tech.name[0]}
                </span>
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="grid md:grid-cols-3 gap-8 mb-16"
        aria-labelledby="features-title"
      >
        <h2 id="features-title" className="sr-only">
          Features
        </h2>
        <article className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Modern Development
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Built with cutting-edge technologies and best practices
          </p>
        </article>

        <article className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div
            className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Fast & Responsive
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Optimized for speed and seamless user experience
          </p>
        </article>

        <article className="card p-6 text-center hover:scale-105 transition-transform duration-200">
          <div
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Beautiful Design
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Carefully crafted with attention to detail and aesthetics
          </p>
        </article>
      </section>
    </div>
  );
}

export default Home;
