import { useEffect, useMemo, useState } from 'react';
import styles from './PresentationPage.module.css';

const slides = [
  {
    id: 'title',
    eyebrow: 'LifeLink',
    title: 'Connecting lives through technology.',
    subtitle: 'Smart Blood & Organ Donation Platform',
    quote: 'Donate Blood, Save Lives',
    notes:
      'Every 2 seconds, someone needs blood… But the real problem is not scarcity — it’s connection. Today, I present not just a website… but a lifeline.',
    theme: 'hero',
    accent: ['Live donor network', 'Real-time response', 'Human-centered care'],
  },
  {
    id: 'problem',
    eyebrow: 'The Problem',
    title: 'In emergencies, delay costs more than time.',
    bullets: ['Delay in finding donors', 'Lack of real-time connection', 'No awareness of nearby camps'],
    notes:
      'Imagine searching for blood in an emergency… calling people, waiting… and time is running out.',
    theme: 'split',
  },
  {
    id: 'solution',
    eyebrow: 'The Solution',
    title: 'LifeLink turns urgency into instant connection.',
    bullets: [
      'Connecting donors instantly',
      'Showing nearby donors using GPS',
      'Providing donation camp details',
      'Promoting organ donation',
    ],
    notes:
      'LifeLink changes everything. It connects people instantly… when every second matters.',
    theme: 'highlight',
  },
  {
    id: 'features-one',
    eyebrow: 'Key Features',
    title: 'Critical help, designed to move fast.',
    bullets: ['Smart Donor Matching (GPS-based)', 'Live Map View', 'Emergency Request System'],
    notes: 'With just a few taps, users can find the nearest donor… instantly.',
    theme: 'cards',
  },
  {
    id: 'features-two',
    eyebrow: 'Key Features',
    title: 'Trust matters when the stakes are real.',
    bullets: ['Secure Login & Registration', 'Donor Health Profiles', 'Blood Donation Camp Listings'],
    notes: 'Every donor is verified, and every detail is reliable.',
    theme: 'cards',
  },
  {
    id: 'organ-awareness',
    eyebrow: 'Organ Donation Awareness',
    title: 'Saving lives does not stop at blood.',
    bullets: ['Awareness section', 'Organ donor pledge', 'Inspirational messaging'],
    notes:
      'Because saving lives doesn’t stop at blood… it continues through organ donation.',
    theme: 'pledge',
  },
  {
    id: 'technology',
    eyebrow: 'Technology Used',
    title: 'Modern web technology. Built for scale.',
    stack: [
      ['Frontend', 'React.js'],
      ['Backend', 'Node.js'],
      ['Database', 'MongoDB'],
      ['Maps', 'GPS / Geolocation API'],
    ],
    notes:
      'This platform is built using modern web technologies to ensure speed and scalability.',
    theme: 'stack',
  },
  {
    id: 'agile',
    eyebrow: 'Agile Development',
    title: 'Built in small steps. Improved at every step.',
    bullets: [
      'Built in small steps (iterations)',
      'Continuous testing and improvement',
      'Flexible and adaptive approach',
    ],
    notes:
      'While developing this project, I followed the Agile methodology. Instead of building everything at once, I developed features step by step — starting from login, then donor system, then GPS features — testing and improving at each stage. This made the system more flexible and efficient.',
    theme: 'timeline',
  },
  {
    id: 'why-agile',
    eyebrow: 'Why Agile?',
    title: 'Real-world systems need room to evolve.',
    bullets: ['Easy to make changes', 'Continuous improvement', 'Better for real-world applications'],
    notes:
      'Agile allows continuous improvement, which is essential for real-time systems like this.',
    theme: 'highlight',
  },
  {
    id: 'impact',
    eyebrow: 'Impact',
    title: 'This is not just a platform. It is a response system.',
    bullets: ['Faster response in emergencies', 'Increased donor engagement', 'More lives saved'],
    notes: 'This is not just a platform… it’s a system that can save lives.',
    theme: 'impact',
  },
  {
    id: 'future',
    eyebrow: 'Future Enhancements',
    title: 'The foundation is here. The next step is bigger reach.',
    bullets: [
      'AI-based donor suggestions',
      'Multi-language support',
      'Mobile app version',
      'Notification system',
    ],
    notes: 'This is just the beginning… LifeLink can grow even further.',
    theme: 'cards',
  },
  {
    id: 'closing',
    eyebrow: 'Closing Thought',
    title: 'Technology connects people. LifeLink connects hearts.',
    quote: 'And sometimes… that connection… is the difference between life and death.',
    notes:
      'And sometimes… that connection… is the difference between life and death.',
    theme: 'closing',
  },
  {
    id: 'thanks',
    eyebrow: 'Thank You',
    title: 'Thank you.',
    subtitle: 'LifeLink',
    quote: 'A smarter way to save lives.',
    notes: 'Thank you for your time.',
    theme: 'hero',
    accent: ['Questions', 'Discussion', 'Live demo ready'],
  },
];

const featureLabels = {
  split: ['Emergency', 'Delay', 'Disconnected'],
  highlight: ['Instant', 'Nearby', 'Actionable'],
  cards: ['Fast', 'Secure', 'Reliable'],
  pledge: ['Awareness', 'Pledge', 'Hope'],
  timeline: ['Plan', 'Build', 'Improve'],
  impact: ['Response', 'Engagement', 'Lives'],
};

const PresentationPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(true);

  const progress = useMemo(
    () => `${(((activeIndex + 1) / slides.length) * 100).toFixed(0)}%`,
    [activeIndex]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, slides.length - 1));
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key.toLowerCase() === 'n') {
        setNotesOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeSlide = slides[activeIndex];
  const labels = activeSlide.accent || featureLabels[activeSlide.theme] || ['LifeLink', 'Care', 'Connection'];

  return (
    <section className={styles.presentationShell}>
      <div className={styles.presentationBackdrop} />

      <div className={styles.topBar}>
        <div>
          <span className={styles.kicker}>LifeLink Presentation</span>
          <strong>
            {activeIndex + 1} / {slides.length}
          </strong>
        </div>

        <div className={styles.topActions}>
          <button type="button" className={styles.utilityButton} onClick={() => setNotesOpen((current) => !current)}>
            {notesOpen ? 'Hide Notes' : 'Show Notes'}
          </button>
          <a href="/" className={styles.utilityLink}>
            Back to Site
          </a>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <span className={styles.progressBar} style={{ width: progress }} />
      </div>

      <div className={styles.deckFrame}>
        <article className={`${styles.slide} ${styles[activeSlide.theme]}`}>
          <div className={styles.slideContent}>
            <div className={styles.copyBlock}>
              <span className={styles.eyebrow}>{activeSlide.eyebrow}</span>
              <h1>{activeSlide.title}</h1>
              {activeSlide.subtitle ? <p className={styles.subtitle}>{activeSlide.subtitle}</p> : null}

              {activeSlide.bullets ? (
                <div className={styles.bulletGrid}>
                  {activeSlide.bullets.map((item, index) => (
                    <div key={item} className={styles.bulletCard} style={{ animationDelay: `${index * 100}ms` }}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeSlide.stack ? (
                <div className={styles.stackGrid}>
                  {activeSlide.stack.map(([label, value], index) => (
                    <div key={label} className={styles.stackCard} style={{ animationDelay: `${index * 120}ms` }}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeSlide.quote ? <blockquote>{activeSlide.quote}</blockquote> : null}
            </div>

            <div className={styles.visualBlock} aria-hidden="true">
              <div className={styles.visualHalo} />
              <div className={styles.visualPanel}>
                <div className={styles.visualHeader}>
                  <span />
                  <span />
                  <span />
                </div>

                <div className={styles.visualBody}>
                  <div className={styles.visualPulse}>
                    <div className={styles.pulseRing} />
                    <div className={styles.pulseCore}>+</div>
                  </div>

                  <div className={styles.signalRow}>
                    {labels.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className={styles.visualMetrics}>
                    <div>
                      <strong>2 sec</strong>
                      <span>someone needs blood</span>
                    </div>
                    <div>
                      <strong>GPS</strong>
                      <span>matching nearest donors</span>
                    </div>
                    <div>
                      <strong>Agile</strong>
                      <span>iterative, adaptable build</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {notesOpen ? (
          <aside className={styles.notesPanel}>
            <span className={styles.notesLabel}>Speaker Notes</span>
            <p>{activeSlide.notes}</p>
            <small>Tip: use Left/Right arrow keys to navigate. Press N to toggle notes.</small>
          </aside>
        ) : null}
      </div>

      <div className={styles.bottomBar}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setActiveIndex((current) => Math.max(current - 1, 0))}
          disabled={activeIndex === 0}
        >
          Previous
        </button>

        <div className={styles.dotRail}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => setActiveIndex((current) => Math.min(current + 1, slides.length - 1))}
          disabled={activeIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default PresentationPage;
