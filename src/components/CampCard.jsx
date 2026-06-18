import { formatDateTime } from '../utils/formatters';
import styles from './CampCard.module.css';

const buildCalendarUrl = (camp) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: camp.title,
    details: `${camp.description} Organized by ${camp.organizer}.`,
    location: camp.location.label,
    dates: `${new Date(camp.startsAt).toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${new Date(camp.endsAt)
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]}Z`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const CampCard = ({ camp, onRegister }) => (
  <article className={`${styles.card} card`}>
    <div className={styles.topline}>
      <span className={`pill ${camp.isVerified ? 'statusSuccess' : 'statusWarning'}`}>
        {camp.isVerified ? 'Verified camp' : 'Pending admin approval'}
      </span>
      <span className="pill">{camp.registeredCount}/{camp.capacity} registered</span>
    </div>

    <div className="stackSm">
      <h3>{camp.title}</h3>
      <p>{camp.description}</p>
    </div>

    <div className={styles.meta}>
      <div>
        <strong>{formatDateTime(camp.startsAt)}</strong>
        <span>Starts</span>
      </div>
      <div>
        <strong>{camp.organizer}</strong>
        <span>Organizer</span>
      </div>
      <div>
        <strong>{camp.location.label}</strong>
        <span>Location</span>
      </div>
    </div>

    <div className={styles.actions}>
      <button type="button" className="button" onClick={() => onRegister?.(camp)} disabled={!camp.isVerified}>
        Register for camp
      </button>
      <a href={buildCalendarUrl(camp)} target="_blank" rel="noreferrer" className="buttonGhost">
        Add to calendar
      </a>
    </div>
  </article>
);

export default CampCard;
