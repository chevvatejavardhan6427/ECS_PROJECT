import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampCard from '../components/CampCard';
import DonorCard from '../components/DonorCard';
import HeroIllustration from '../components/HeroIllustration';
import LoadingPulse from '../components/LoadingPulse';
import QuoteStrip from '../components/QuoteStrip';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { useUi } from '../context/UiContext';
import { getOverview } from '../services/platformService';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useUi();
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    getOverview().then(setOverview);
  }, []);

  if (!overview) {
    return <LoadingPulse label="Preparing the LifeLink network" />;
  }

  return (
    <>
      <section className={`section container ${styles.heroSection}`}>
        <div className={`${styles.hero} surface`}>
          <div className={styles.copy}>
            <span className="badge">Live donor matching · verified camps · organ pledge awareness</span>
            <h1>{t('heroTitle')}</h1>
            <p>{t('heroSubtitle')}</p>
            <div className={styles.actions}>
              <Link to="/search" className="button">
                Find Donors Near You
              </Link>
              <Link to={isAuthenticated ? '/dashboard' : '/auth?mode=register'} className="buttonSecondary">
                {isAuthenticated ? 'Open dashboard' : t('register')}
              </Link>
            </div>
            <div className={styles.quoteCloud}>
              <span className="pill">Donate blood, save lives</span>
              <span className="pill">Be the reason someone smiles today</span>
              <span className="pill">Privacy-safe emergency response</span>
            </div>
          </div>

          <div className={styles.visual}>
            <HeroIllustration />
            <div className={styles.highlightCard}>
              <strong>AI donor matching</strong>
              <p>Distance, eligibility, availability, and blood group are scored in one flow.</p>
            </div>
            <div className={styles.supportCard}>
              <strong>Approximate radius only</strong>
              <p>LifeLink protects exact donor locations until contact requests are verified.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="gridAuto">
          {overview.stats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeader
          eyebrow="Nearby hope"
          title="Spotlight donors ready to respond"
          description="A donor directory designed to feel calm, credible, and fast during urgent moments. Exact addresses stay hidden until a secure request is accepted."
          action={
            <button type="button" className="buttonGhost" onClick={() => navigate('/search')}>
              Explore map view
            </button>
          }
        />
        <div className="gridAuto">
          {overview.spotlightDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} onRequestContact={() => navigate(isAuthenticated ? '/search' : '/auth')} />
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeader
          eyebrow="Verified donation camps"
          title="Join trusted blood drives and awareness events"
          description="Camp approvals, organizer details, and turnout numbers are visible before you commit."
        />
        <div className="gridAuto">
          {overview.camps.map((camp) => (
            <CampCard key={camp.id} camp={camp} onRegister={() => navigate(isAuthenticated ? '/camps' : '/auth')} />
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeader
          eyebrow="Words that move people"
          title="Awareness that feels personal, not clinical"
          description="LifeLink uses warm visuals and clear explanations to lower hesitation around blood and organ donation."
        />
        <QuoteStrip quotes={overview.quotes} />
      </section>
    </>
  );
};

export default LandingPage;
