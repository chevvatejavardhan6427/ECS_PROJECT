import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <section className="section container">
    <div className={`${styles.card} surface`}>
      <span className="badge">404</span>
      <h1>This route does not exist in LifeLink</h1>
      <p>The page may have moved, or you may need to return to the dashboard or donor search.</p>
      <div className={styles.actions}>
        <Link to="/" className="button">Back to home</Link>
        <Link to="/search" className="buttonGhost">Open donor search</Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
