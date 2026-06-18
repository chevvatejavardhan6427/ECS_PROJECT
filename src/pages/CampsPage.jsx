import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampCard from '../components/CampCard';
import LoadingPulse from '../components/LoadingPulse';
import MapPanel from '../components/MapPanel';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../context/AuthContext';
import { useRealtimeFeed } from '../hooks/useRealtimeFeed';
import { getCamps, registerForCamp } from '../services/platformService';
import styles from './CampsPage.module.css';

const CampsPage = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const { data, loading, refresh } = useRealtimeFeed(() => getCamps(), [], 30000);

  if (loading || !data) {
    return <LoadingPulse label="Loading verified donation camps" />;
  }

  const markers = data.camps.map((camp) => ({
    id: camp.id,
    name: camp.title,
    type: 'camp',
    location: { lat: camp.location.lat, lng: camp.location.lng },
    detail: `${camp.organizer} · ${camp.location.label}`,
  }));

  const handleRegister = async (camp) => {
    if (!isAuthenticated) {
      navigate('/auth?mode=register');
      return;
    }

    const response = await registerForCamp(token, camp.id);
    setMessage(response.message || `Registration captured for ${camp.title}.`);
    refresh();
  };

  return (
    <section className="section container">
      <SectionHeader
        eyebrow="Verified donation camps"
        title="Plan around trusted camps with map and schedule details"
        description="Every approved camp includes organizer identity, attendance volume, and calendar shortcuts for easier commitment."
        action={
          <button type="button" className="buttonGhost" onClick={refresh}>
            Refresh camp feed
          </button>
        }
      />

      {message ? <p className={styles.message}>{message}</p> : null}

      <div className={styles.layout}>
        <MapPanel center={{ lat: 12.9716, lng: 77.5946 }} markers={markers} title="Donation camps across your city" />
        <div className={`${styles.sidebar} surface`}>
          <h3>Why verified camps matter</h3>
          <p>Admin approval reduces spam, confirms organizer details, and ensures availability of screening staff, recovery space, and emergency support.</p>
          <ul>
            <li>Organizer identity checked</li>
            <li>Location and timing validated</li>
            <li>Capacity tracking for smoother turnout</li>
          </ul>
        </div>
      </div>

      <div className="section">
        <div className="gridAuto">
          {data.camps.map((camp) => (
            <CampCard key={camp.id} camp={camp} onRegister={handleRegister} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampsPage;
