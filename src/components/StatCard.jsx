import styles from './StatCard.module.css';

const StatCard = ({ value, label, detail }) => (
  <article className={`${styles.card} card fadeUp`}>
    <strong>{value}</strong>
    <span>{label}</span>
    <small>{detail}</small>
  </article>
);

export default StatCard;
