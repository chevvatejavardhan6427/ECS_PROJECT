import { relativeTime } from '../utils/formatters';
import styles from './NotificationCenter.module.css';

const NotificationCenter = ({ notifications = [], onMarkRead }) => (
  <aside className={`${styles.panel} surface`}>
    <div className={styles.header}>
      <div>
        <span className="badge">Live alerts</span>
        <h3>Notifications</h3>
      </div>
      <span className="pill">{notifications.length} total</span>
    </div>
    <div className={styles.list}>
      {notifications.map((notification) => (
        <article key={notification.id} className={`${styles.item} ${notification.isRead ? '' : styles.unread}`}>
          <div className="stackSm">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
            <small>{relativeTime(notification.createdAt)}</small>
          </div>
          {!notification.isRead ? (
            <button type="button" className="buttonGhost" onClick={() => onMarkRead?.(notification.id)}>
              Mark read
            </button>
          ) : null}
        </article>
      ))}
    </div>
  </aside>
);

export default NotificationCenter;
