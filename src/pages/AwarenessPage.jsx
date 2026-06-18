import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPulse from '../components/LoadingPulse';
import QuoteStrip from '../components/QuoteStrip';
import SectionHeader from '../components/SectionHeader';
import { quotes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { getAwareness, pledgeOrganDonation } from '../services/platformService';
import styles from './AwarenessPage.module.css';

const organOptions = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Cornea'];

const AwarenessPage = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ familyInformed: true, consent: true, organTypes: ['Kidney', 'Liver'], notes: '' });

  useEffect(() => {
    getAwareness().then(setContent);
  }, []);

  if (!content) {
    return <LoadingPulse label="Loading organ donation awareness resources" />;
  }

  const toggleOrgan = (organ) => {
    setForm((current) => ({
      ...current,
      organTypes: current.organTypes.includes(organ)
        ? current.organTypes.filter((item) => item !== organ)
        : [...current.organTypes, organ],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth?mode=register');
      return;
    }

    const response = await pledgeOrganDonation(token, form);
    setMessage(response.message || 'Your organ donation pledge has been recorded.');
  };

  return (
    <section className="section container">
      <div className={`${styles.hero} surface`}>
        <span className="badge">Organ donation awareness</span>
        <h1>{content.hero.title}</h1>
        <p>{content.hero.subtitle}</p>
      </div>

      <section className="section">
        <SectionHeader
          eyebrow="Myths vs facts"
          title="Make the decision with clarity"
          description="Simple, accurate explanations reduce hesitation and make family conversations easier."
        />
        <div className="gridAuto">
          {content.mythsVsFacts.map((item) => (
            <article key={item.myth} className={`${styles.factCard} card`}>
              <span className="pill statusDanger">Myth</span>
              <strong>{item.myth}</strong>
              <span className="pill statusSuccess">Fact</span>
              <p>{item.fact}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.split}>
        <div>
          <SectionHeader
            eyebrow="Pledge"
            title="Record your organ donation intent"
            description="Link your pledge to your LifeLink account so reminders and family communication notes stay organized."
          />
          <form className={`${styles.pledgeForm} surface`} onSubmit={handleSubmit}>
            <div className={styles.organGrid}>
              {organOptions.map((organ) => (
                <button
                  key={organ}
                  type="button"
                  className={form.organTypes.includes(organ) ? 'buttonSecondary' : 'buttonGhost'}
                  onClick={() => toggleOrgan(organ)}
                >
                  {organ}
                </button>
              ))}
            </div>
            <label className="label">
              Notes for your family or care team
              <textarea className="textarea" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
            </label>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={form.familyInformed} onChange={(event) => setForm((current) => ({ ...current, familyInformed: event.target.checked }))} />
              I have informed my family or emergency contact.
            </label>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))} />
              I understand this is a recorded pledge, not a medical clearance.
            </label>
            {message ? <p className={styles.message}>{message}</p> : null}
            <button type="submit" className="buttonAccent">Save pledge</button>
          </form>
        </div>

        <div className="flow">
          <article className={`${styles.stepsCard} card`}>
            <h3>Best next steps</h3>
            <ol>
              {content.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
          <QuoteStrip quotes={quotes.slice(0, 2)} />
        </div>
      </section>
    </section>
  );
};

export default AwarenessPage;
