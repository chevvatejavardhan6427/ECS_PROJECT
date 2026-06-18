import { useState } from 'react';
import LoadingPulse from '../components/LoadingPulse';
import MapPanel from '../components/MapPanel';
import SectionHeader from '../components/SectionHeader';
import { bloodGroups } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { useRealtimeFeed } from '../hooks/useRealtimeFeed';
import { createEmergencyRequest, getEmergencyRequests } from '../services/platformService';
import { formatDateTime } from '../utils/formatters';
import styles from './EmergencyPage.module.css';

const EmergencyPage = () => {
  const { token, user } = useAuth();
  const { coords } = useGeoLocation();
  const [form, setForm] = useState({
    bloodGroup: user?.bloodGroup || 'O+',
    units: 1,
    priority: 'Critical',
    hospitalName: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  const { data, loading, refresh } = useRealtimeFeed(
    () => getEmergencyRequests({ token, ...coords }),
    [token, coords.lat, coords.lng],
    15000
  );

  if (loading || !data) {
    return <LoadingPulse label="Syncing live emergency requests" />;
  }

  const markers = data.requests.map((request) => ({
    id: request.id,
    name: request.requesterName,
    type: 'request',
    location: request.location,
    detail: `${request.bloodGroup} · ${request.priority} · ${request.hospitalName}`,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createEmergencyRequest(token, {
      ...form,
      units: Number(form.units),
      location: coords,
    });
    setMessage(response.message || 'Emergency request created. Nearby donors will be notified if the request passes fraud checks.');
    setForm((current) => ({ ...current, hospitalName: '', reason: '', units: 1 }));
    refresh();
  };

  return (
    <section className="section container">
      <SectionHeader
        eyebrow="Emergency request system"
        title="Post urgent requests and notify nearby donors"
        description="Fraud checks inspect duplicate activity, missing hospital context, and suspicious urgency patterns before wide donor alerts go out."
      />

      <div className={styles.layout}>
        <form className={`${styles.form} surface`} onSubmit={handleSubmit}>
          <div className="formGrid">
            <label className="label">
              Blood group needed
              <select className="select" value={form.bloodGroup} onChange={(event) => setForm((current) => ({ ...current, bloodGroup: event.target.value }))}>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </label>
            <label className="label">
              Units required
              <input className="input" type="number" min="1" max="6" value={form.units} onChange={(event) => setForm((current) => ({ ...current, units: event.target.value }))} />
            </label>
            <label className="label">
              Priority
              <select className="select" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
                <option value="Critical">Critical</option>
                <option value="Normal">Normal</option>
              </select>
            </label>
            <label className="label">
              Hospital or blood bank
              <input className="input" value={form.hospitalName} onChange={(event) => setForm((current) => ({ ...current, hospitalName: event.target.value }))} required />
            </label>
          </div>
          <label className="label">
            Clinical reason or request context
            <textarea className="textarea" value={form.reason} onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))} required />
          </label>
          {message ? <p className={styles.message}>{message}</p> : null}
          <button type="submit" className="button">Notify nearby donors</button>
        </form>

        <MapPanel center={coords} markers={markers} title="Real-time emergency request locations" />
      </div>

      <div className="section">
        <SectionHeader
          eyebrow="Live requests"
          title="Requests currently active in the network"
          description="Critical requests appear first. Flagged requests remain visible only to admins until verification is completed."
        />
        <div className="gridAuto">
          {data.requests.map((request) => (
            <article key={request.id} className={`${styles.requestCard} card ${request.isFlagged ? styles.flagged : ''}`}>
              <div className={styles.row}>
                <span className={`pill ${request.priority === 'Critical' ? 'statusDanger' : 'statusWarning'}`}>{request.priority}</span>
                <span className="pill">{request.status}</span>
              </div>
              <h3>{request.requesterName}</h3>
              <p>{request.reason}</p>
              <small>{request.hospitalName} · {formatDateTime(request.createdAt)}</small>
              {request.isFlagged ? <strong className={styles.flagMessage}>Under fraud review before donor broadcast.</strong> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyPage;
