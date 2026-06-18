import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.inner}`}>
      <div className={styles.copy}>
        <h3>LifeLink</h3>
        <p>Designing calmer emergency response for blood and organ donation communities.</p>
      </div>
      <div className={styles.links}>
        <Link to="/awareness">Organ donation awareness</Link>
        <Link to="/camps">Verified camps</Link>
        <Link to="/search">Find donors</Link>
      </div>
      <span className={styles.tagline}>Donate blood, save lives.</span>
    </div>
  </footer>
);

export default Footer;
