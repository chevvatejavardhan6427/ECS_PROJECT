import styles from './LoadingPulse.module.css';

const LoadingPulse = ({ label = 'Loading LifeLink' }) => (
  <div className={styles.wrap}>
    <div className={styles.loader} />
    <p>{label}</p>
  </div>
);

export default LoadingPulse;
