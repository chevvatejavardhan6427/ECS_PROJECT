import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toggleAvailability } from '../services/platformService';
import { formatDate } from '../utils/formatters';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, token, updateUser } = useAuth();
  const [message, setMessage] = useState('');

  const handleToggle = async () => {
    const response = await toggleAvailability(token, !user.isAvailable);
    updateUser((current) => ({ ...current, isAvailable: response.user.isAvailable }));
    setMessage(response.user.isAvailable ? 'You are visible in nearby donor results.' : 'You are hidden from nearby donor results.');
  };

  return (
    <section className="section container">
      <div className={styles.layout}>
        <article className={`${styles.profile} surface`}>
          <span className="badge">{user.role === 'donor' ? 'Donor profile' : 'Member profile'}</span>
          <h1>{user.name}</h1>
          <p>Blood group: <strong>{user.bloodGroup}</strong> · Role: <strong>{user.role}</strong> · Age: <strong>{user.age || 'Not set'}</strong></p>
          <div className={styles.metrics}>
            <div>
              <strong>{formatDate(user.lastDonationDate)}</strong>
              <span>Last donation date</span>
            </div>
            <div>
              <strong>{user.eligibilityStatus || 'Eligibility tracked'}</strong>
              <span>Cooldown status</span>
            </div>
            <div>
              <strong>{user.isAvailable ? 'Available' : 'Not available'}</strong>
              <span>Live donor visibility</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" className={user.isAvailable ? 'buttonAccent' : 'button'} onClick={handleToggle}>
              {user.isAvailable ? 'Pause availability' : 'Become available'}
            </button>
            <button type="button" className="buttonGhost">Request health review</button>
          </div>
          {message ? <p className={styles.message}>{message}</p> : null}
        </article>

        <div className="flow">
          <article className={`${styles.card} card`}>
            <h3>Privacy controls</h3>
            <p>Exact coordinates remain hidden. Search results show only approximate radius and city-level placement until both sides accept contact.</p>
          </article>
          <article className={`${styles.card} card`}>
            <h3>Eligibility reminders</h3>
            <p>Donation cooldown follows the 3-month rule. Health records can trigger reminders when hemoglobin, weight, or recent donation history changes.</p>
          </article>
          <article className={`${styles.card} card`}>
            <h3>Organ donation pledge</h3>
            <p>Use the awareness section to record your intent, family communication status, and selected organ donation preferences.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
