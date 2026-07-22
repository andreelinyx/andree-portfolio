import { useEffect, useState } from 'react';
import './App.css';

const emptyProfile = {
  name: '',
  role: '',
  location: '',
  email: '',
  availability: '',
  lookingFor: '',
  summary: '',
  about: '',
  resumeHref: '',
  links: [],
  education: [],
  research: [],
  stats: [],
  skills: [],
  projects: [],
  experience: [],
  services: []
};

const heroArtifacts = [
  {
    id: 'code',
    label: 'Code',
    title: 'full-stack builds',
    lines: ['React interfaces', 'Express APIs', 'PostgreSQL data']
  },
  {
    id: 'research',
    label: 'Research',
    title: 'EEG + ML notes',
    lines: ['Signal cleanup', 'Model experiments', 'Pattern review']
  },
  {
    id: 'product',
    label: 'Product',
    title: 'launch checklist',
    lines: ['User stories', 'QA flows', 'Clear handoff']
  }
];

export default function App() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeHeroCard, setActiveHeroCard] = useState(heroArtifacts[0].id);

  const currentArtifact = heroArtifacts.find((artifact) => artifact.id === activeHeroCard) || heroArtifacts[0];

  // Load the portfolio once when React mounts the page.
  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/profile', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Portfolio request failed');
        return response.json();
      })
      .then(setProfile)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError('Portfolio data is temporarily unavailable.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <main className="state-view">Loading portfolio...</main>;
  if (error || !profile.name) {
    return <main className="state-view">{error || 'Portfolio could not be loaded.'}</main>;
  }

  return (
    <main className="site-shell">
      <div className="announcement">LET'S CREATE SOMETHING THOUGHTFUL</div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name} home`}>Andree.</a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#services">Skills</a>
          <a href={`mailto:${profile.email}`}>Enquire</a>
          <a href="#experience">Experience</a>
          <a href="#work">Projects</a>
          <a href="#education">Education</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="scrap-cluster scrap-cluster-left" aria-hidden="true">
          <span className="scrap-paper"></span>
          <span className="scrap-clip"></span>
          <span className="scrap-tag">build log</span>
          <span className="scrap-tape"></span>
        </div>
        <div className="scrap-cluster scrap-cluster-right" aria-hidden="true">
          <span className="scrap-record"></span>
          <span className="scrap-folder"></span>
          <span className="scrap-tool-grid">
            {['JS', 'PY', 'SQL', 'UX'].map((item) => <i key={item}>{item}</i>)}
          </span>
        </div>
        <p className="eyebrow">CS STUDENT, BUILDER, RESEARCHER</p>

        <div className="hero-workspace" aria-label="Interactive scrapbook of Andree's portfolio focus areas">
          <button
            className="workspace-card workspace-note"
            type="button"
            onClick={() => setActiveHeroCard('code')}
            aria-pressed={activeHeroCard === 'code'}
          >
            <span className="workspace-label">index.jsx</span>
            <strong>Build the useful thing.</strong>
            <span className="code-lines" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </button>

          <button
            className="workspace-card workspace-polaroid"
            type="button"
            onClick={() => setActiveHeroCard('research')}
            aria-pressed={activeHeroCard === 'research'}
          >
            <span className="photo-strip" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <strong>research notes</strong>
          </button>

          <button
            className="workspace-card workspace-terminal"
            type="button"
            onClick={() => setActiveHeroCard('product')}
            aria-pressed={activeHeroCard === 'product'}
          >
            <span className="window-dots" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>&gt; ship thoughtful systems</span>
            <span>&gt; test the actual flow</span>
          </button>

          <article className={`artifact-detail artifact-${currentArtifact.id}`}>
            <span>{currentArtifact.label}</span>
            <h2>{currentArtifact.title}</h2>
            <ul>
              {currentArtifact.lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </article>

          <span className="studio-stamp">AL<br />COMPUTER<br />SCIENCE</span>
        </div>

        <h1>Andree Lin</h1>

        <div className="hero-details">
          <p>{profile.summary}</p>
          <p>
            Computer Science major with a Mathematics and Music minor at the
            University of Wisconsin-La Crosse. {profile.lookingFor}
          </p>
        </div>

        <div className="hero-actions">
          <a className="primary-action" href={`mailto:${profile.email}`}>Email me</a>
          <a className="secondary-action" href="#work">View projects</a>
          <a className="secondary-action" href={profile.resumeHref} download>Download resume</a>
        </div>
      </section>

      <section className="stats" aria-label="Portfolio highlights">
        {profile.stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="section-grid intro-section" id="services">
        <div>
          <p className="section-kicker">Skills &amp; toolkit</p>
          <h2>Code, product thinking, and visual detail.</h2>
        </div>
        <div className="skill-cloud" aria-label="Skills">
          {profile.skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="section-kicker">Selected projects</p>
          <h2>Applications, research, and search experiences.</h2>
        </div>
        <div className="project-grid">
          {profile.projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <span className="project-number">0{index + 1}</span>
              <div>
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span>{project.impact}</span>
              </div>
              <p>{project.description}</p>
              <ul>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              {project.links?.length > 0 && (
                <div className="project-links">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid education-section" id="education">
        <div>
          <p className="section-kicker">Education</p>
          <h2>Computer science with creative range.</h2>
          <p className="about-note">{profile.about}</p>
        </div>
        <div className="education-list">
          {profile.education.map((item) => (
            <article key={item.school}>
              <span>{item.period}</span>
              <h3>{item.degree}</h3>
              <p className="company">{item.school}</p>
              <ul>
                {item.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading">
          <p className="section-kicker">Research</p>
          <h2>Signals, data, and meaningful technical questions.</h2>
        </div>
        <div className="research-grid">
          {profile.research.map((item) => (
            <article key={item.title}>
              <div>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p className="company">{item.organization}</p>
              </div>
              <p>{item.description}</p>
              <ul>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="research-tools">
                {item.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid about-section" id="experience">
        <div>
          <p className="section-kicker">Experience</p>
          <h2>Building across engineering, research, and product.</h2>
          <p className="about-note">{profile.role} based in {profile.location}.</p>
        </div>
        <div className="timeline">
          {profile.experience.map((job) => (
            <article key={`${job.company}-${job.period}`}>
              <span>{job.period}</span>
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p>{job.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services">
        <div className="section-heading">
          <p className="section-kicker">Ways to collaborate</p>
          <h2>Useful places to plug me in.</h2>
        </div>
        <div className="service-list">
          {profile.services.map((service) => <span key={service}>{service}</span>)}
        </div>
      </section>

      <section className="contact-panel">
        <p className="section-kicker">Start a conversation</p>
        <h2>Want to talk projects, internships, or research?</h2>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="profile-links" aria-label="Profile links">
          <a href={profile.resumeHref} download>Resume</a>
          {(profile.links || []).map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <footer>
        <span>{new Date().getFullYear()} {profile.name}</span>
        <span>PostgreSQL, Express, React, and Node.</span>
      </footer>
    </main>
  );
}
