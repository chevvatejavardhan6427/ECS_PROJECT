import styles from './QuoteStrip.module.css';

const QuoteStrip = ({ quotes = [] }) => (
  <div className={styles.wrap}>
    {quotes.map((quote) => (
      <blockquote key={quote} className={`${styles.quote} card`}>
        <span>“</span>
        <p>{quote}</p>
      </blockquote>
    ))}
  </div>
);

export default QuoteStrip;
