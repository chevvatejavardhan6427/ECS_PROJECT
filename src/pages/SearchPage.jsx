import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorCard from '../components/DonorCard';
import FilterBar from '../components/FilterBar';
import LoadingPulse from '../components/LoadingPulse';
import MapPanel from '../components/MapPanel';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useRealtimeFeed } from '../hooks/useRealtimeFeed';
import { getNearbyDonors } from '../services/platformService';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const { coords, error: locationError } = useGeoLocation();
  const [filters, setFilters] = useState({ bloodGroup: '', radius: 10 });
  const [banner, setBanner] = useState('');

  const { data, loading, refresh } = useRealtimeFeed(
    () => getNearbyDonors({ token, ...filters, ...coords }),
    [token, filters.bloodGroup, filters.radius, coords.lat, coords.lng],
    20000
  );

  if (loading || !data) {
    return <LoadingPulse label="Mapping nearby donors and blood support centers" />;
  }

  const markers = [
    ...data.donors.map((donor) => ({
      id: donor.id,
      name: donor.name,
      type: 'donor',
      location: donor.location,
      detail: `${donor.bloodGroup} donor · ${donor.approximateLocation}`,
    })),
    ...data.hospitals.map((item) => ({
      id: item.id,
      name: item.name,
      type: 'hospital',
      location: item.location,
      detail: item.type,
    })),
    ...data.bloodBanks.map((item) => ({
      id: item.id,
      name: item.name,
      type: 'bank',
      location: item.location,
      detail: item.type,
    })),
  ];

  const handleRequestContact = (donor) => {
    if (!isAuthenticated) {
      navigate('/auth?mode=register');
      return;
    }

    setBanner(`Secure contact request submitted for ${donor.name}. Their exact location stays hidden until the request is accepted.`);
  };

  return (
    <section className="section container">
      <SectionHeader
        eyebrow="Search and map"
        title="Find nearby donors, hospitals, and blood banks"
        description="Map data refreshes automatically. GPS is used for approximate matching, while donor privacy remains protected by radius-only sharing."
      />
      <FilterBar
        filters={filters}
        onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
        onReset={() => setFilters({ bloodGroup: '', radius: 10 })}
        locationStatus={locationError || `Showing results near ${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`}
        action={
          <button type="button" className="button" onClick={refresh}>
            Refresh map
          </button>
        }
      />

      {banner ? <p className={styles.banner}>{banner}</p> : null}

      <div className={styles.layout}>
        <MapPanel center={coords} markers={markers} title="Interactive donor and support center map" />
        <div className="stackMd">
          <article className={`${styles.summaryCard} card`}>
            <strong>{data.donors.length}</strong>
            <span>Donors in radius</span>
          </article>
          <article className={`${styles.summaryCard} card`}>
            <strong>{data.hospitals.length}</strong>
            <span>Hospitals nearby</span>
          </article>
          <article className={`${styles.summaryCard} card`}>
            <strong>{data.bloodBanks.length}</strong>
            <span>Blood banks nearby</span>
          </article>
          {!isAuthenticated ? (
            <article className={`${styles.ctaCard} surface`}>
              <h3>Create a secure LifeLink account</h3>
              <p>Login is required to send private contact requests, post emergency requests, and manage donation eligibility.</p>
              <button type="button" className="button" onClick={() => navigate('/auth?mode=register')}>
                Register now
              </button>
            </article>
          ) : null}
        </div>
      </div>

      <div className="section">
        <SectionHeader
          eyebrow="Compatible donors"
          title="Available donors sorted by AI compatibility"
          description="Matching prioritizes compatible blood group, distance, live availability, and cooldown eligibility."
        />
        <div className={styles.donorGrid}>
          {data.donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} onRequestContact={handleRequestContact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
