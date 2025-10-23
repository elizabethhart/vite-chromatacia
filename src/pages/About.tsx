function About() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section
        className="text-center mb-16 animate-fade-in"
        aria-labelledby="about-title"
      >
        <div
          className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-8"
          aria-hidden="true"
        >
          <span className="text-4xl font-bold text-white">EH</span>
        </div>
        <h1
          id="about-title"
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
        >
          Hi, I'm Elizabeth Hart
        </h1>
        <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-8">
          Software Engineer & Technology Enthusiast
        </p>
      </section>

      {/* About Content */}
      <div className="mb-16">
        <div className="card p-8 animate-slide-up max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            About Me
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            I'm a front-end software developer dedicated to crafting exceptional
            user experiences. My focus lies in the intersection of performance
            and design, ensuring that the UIs I build are not only fast and
            responsive but also usable by everyone. I'm passionate about clean
            code, modern web standards, and solving complex challenges with
            elegant, user-centric solutions.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            When I'm not coding, you can find me with my nose in a book, at a
            coffee shop, or out hiking with friends.
          </p>
        </div>
      </div>

      {/* Technology Experience */}
      <section
        className="card p-8 mb-16 animate-scale-in"
        aria-labelledby="tech-experience-title"
      >
        <h2
          id="tech-experience-title"
          className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 text-center"
        >
          Technology Experience
        </h2>
        <div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          role="list"
          aria-label="Technology skills"
        >
          {[
            { name: "TypeScript", icon: "TS" },
            { name: "React", icon: "⚛️" },
            { name: "Node.js", icon: "🟢" },
            { name: "AWS", icon: "☁️" },
            { name: "Docker", icon: "🐳" },
            { name: "PostgreSQL", icon: "🐘" },
            { name: "Git", icon: "📝" },
            { name: "Vite", icon: "⚡" },
            { name: "Vitest", icon: "⚡" },
            { name: "Jest", icon: "🧪" },
            { name: "Tailwind", icon: "🎨" },
            { name: "GraphQL", icon: "🔷" },
          ].map((tech, index) => (
            <div
              key={tech.name}
              className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
              aria-label={`${tech.name} skill`}
            >
              <div
                className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
              >
                {tech.icon}
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="card p-8 text-center animate-fade-in"
        aria-labelledby="contact-title"
      >
        <h2
          id="contact-title"
          className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
        >
          Let's Connect
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          I'm always interested in new opportunities and collaborations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/elizabethhart"
            className="btn-secondary inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Elizabeth Hart's GitHub profile (opens in new tab)"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
