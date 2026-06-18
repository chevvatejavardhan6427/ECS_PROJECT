import { useState } from 'react';
import CampCard from '../components/CampCard';
import DonorCard from '../components/DonorCard';
import FilterBar from '../components/FilterBar';
import LoadingPulse from '../components/LoadingPulse';
import NotificationCenter from '../components/NotificationCenter';
import QuoteStrip from '../components/QuoteStrip';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useRealtimeFeed } from '../hooks/useRealtimeFeed';
import {
  getDashboard,
  markNotificationRead,
  registerForCamp,
  toggleAvailability,
} from '../services/platformService';
import { formatDateTime } from '../utils/formatters';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { token, user, updateUser } = useAuth();
  const { coords, error: locationError, requestLocation } = useGeoLocation();
  const [filters, setFilters] = useState({ bloodGroup: user?.bloodGroup || '', radius: 10 });
  const [banner, setBanner] = useState('');

  const { data, loading, refresh } = useRealtimeFeed(
    () => getDashboard(token, { ...filters, ...coords }),
    [token, filters.bloodGroup, filters.radius, coords.lat, coords.lng],
    25000
  );

  if (loading || !data) {
    return <LoadingPulse label="Loading your donor network dashboard" />;
  }

  const handleAvailabilityToggle = async () => {
    const response = await toggleAvailability(token, !user.isAvailable);
    updateUser((current) => ({ ...current, isAvailable: response.user.isAvailable }));
    setBanner(response.user.isAvailable ? 'You are now visible for nearby matching.' : 'You are hidden from nearby donor matching.');
  };

  const handleCampRegister = async (camp) => {
    const response = await registerForCamp(token, camp.id);
    setBanner(response.message || 'Camp registration submitted.');
  };

  const handleMarkRead = async (id) => {
    await markNotificationRead(token, id);
    refresh();
  };

  const handleContact = (donor) => {
    setBanner(`Secure contact request sent to ${donor.name}. Exact contact details stay protected until the donor responds.`);
  };

  return (
    <section className="section container">
      <div className={styles.hero}>
        <div className={`${styles.welcome} surface`}>
          <div className="pageIntro">
            <span className="badge">Personalized dashboard</span>
            <h1>Hello, {user.name}</h1>
            <p>
              Your current blood group is <strong>{user.bloodGroup}</strong>. LifeLink is checking nearby donors, verified camps, and active emergency requests around your city-level location.
            </p>
          </div>
          <div className={styles.quickActions}>
            <button type="button" className={user.isAvailable ? 'buttonAccent' : 'button'} onClick={handleAvailabilityToggle}>
              {user.isAvailable ? 'Available for donation' : 'Set as available'}
            </button>
            <button type="button" className="buttonGhost" onClick={requestLocation}>
              Refresh location
            </button>
          </div>
          <div className={styles.healthPanel}>
            <div>
              <strong>{user.eligibilityStatus || 'Eligibility tracked'}</strong>
              <span>Donation cooldown status</span>
            </div>
            <div>
              <strong>{locationError || 'GPS synced'}</strong>
              <span>Location health</span>
            </div>
            <div>
              <strong>Critical requests ready</strong>
              <span>Tap the emergency button anytime</span>
            </div>
          </div>
          {banner ? <p className={styles.banner}>{banner}</p> : null}
        </div>

        <NotificationCenter notifications={data.notifications} onMarkRead={handleMarkRead} />
      </div>

      <div className="section">
        <div className="gridAuto">
          {data.stats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </div>

      <div className="section">
        <SectionHeader
          eyebrow="Smart donor matching"
          title="Nearby donors sorted by compatibility"
          description="AI matching scores combine distance, blood group compatibility, live availability, and donation cooldown eligibility."
        />
        <FilterBar
          filters={filters}
          onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
          onReset={() => setFilters({ bloodGroup: user?.bloodGroup || '', radius: 10 })}
          locationStatus={locationError || `Tracking approximate location around ${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`}
          action={
            <button type="button" className="button" onClick={refresh}>
              Refresh matches
            </button>
          }
        />
        <div className={styles.donorGrid}>
          {data.nearbyDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} onRequestContact={handleContact} />
          ))}
        </div>
      </div>

      <div className={styles.splitSection}>
        <div>
          <SectionHeader
            eyebrow="Urgent requests"
            title="Active emergencies in your donor radius"
            description="High-priority alerts are verified before donors receive notifications."
          />
          <div className="stackMd">
            {data.emergencyRequests.map((item) => (
              <article key={item.id} className={`${styles.requestCard} card`}>
                <div className={styles.requestHeader}>
                  <span className={`pill ${item.priority === 'Critical' ? 'statusDanger' : 'statusWarning'}`}>{item.priority}</span>
                  <span className="pill">{item.bloodGroup} · {item.units} unit(s)</span>
                </div>
                <strong>{item.requesterName}</strong>
                <p>{item.reason}</p>
                <small>{formatDateTime(item.createdAt)} · {item.hospitalName}</small>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Upcoming camps"
            title="Verified places to show up and help"
            description="Camp participation automatically updates reminders and attendance analytics."
          />
          <div className="stackMd">
            {data.camps.map((camp) => (
              <CampCard key={camp.id} camp={camp} onRegister={handleCampRegister} />
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <SectionHeader
          eyebrow="Care-centered messaging"
          title="Keep the experience emotionally steady"
          description="Human language matters in emergency systems. LifeLink keeps messaging compassionate, clear, and concise."
        />
        <QuoteStrip quotes={data.quotes} />
      </section>
    </section>
  );
};

export default DashboardPage;
