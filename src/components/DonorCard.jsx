import { formatDate, formatDistance } from '../utils/formatters';
import styles from './DonorCard.module.css';

const DonorCard = ({ donor, onRequestContact }) => (
  <article className={`${styles.card} card`}>
    <div className={styles.header}>
      <div>
        <span className="badge">{donor.bloodGroup}</span>
        <h3>{donor.name}</h3>
        <p>
          {donor.age} yrs · {donor.approximateLocation}
        </p>
      </div>
      <span className={`pill ${donor.isAvailable ? 'statusSuccess' : 'statusWarning'}`}>
        {donor.isAvailable ? 'Available' : 'Cooling down'}
      </span>
    </div>

    <div className={styles.metrics}>
      <div>
        <strong>{donor.matchScore}</strong>
        <span>AI match</span>
      </div>
      <div>
        <strong>{formatDistance(donor.distanceKm)}</strong>
        <span>Approx. distance</span>
      </div>
      <div>
        <strong>{formatDate(donor.lastDonationDate)}</strong>
        <span>Last donation</span>
      </div>
    </div>

    <div className={styles.footer}>
      <span className={`pill ${donor.eligibilityStatus.includes('now') ? 'statusSuccess' : 'statusWarning'}`}>
        {donor.eligibilityStatus}
      </span>
      <button
        type="button"
        className={`buttonSecondary ${styles.ctaButton}`}
        onClick={() => onRequestContact?.(donor)}
        disabled={!donor.isAvailable}
      >
        Request secure contact
      </button>
    </div>
  </article>
);

export default DonorCard;
