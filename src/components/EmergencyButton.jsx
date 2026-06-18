import { Link } from 'react-router-dom';
import styles from './EmergencyButton.module.css';

const EmergencyButton = () => (
  <Link to="/emergency" className={styles.button}>
    Emergency request
  </Link>
);

export default EmergencyButton;
