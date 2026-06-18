import styles from './SectionHeader.module.css';

const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className={`sectionHeaderRow ${styles.header}`}>
    <div className="pageIntro">
      {eyebrow ? <span className="badge">{eyebrow}</span> : null}
      <h2 className="sectionTitle">{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);

export default SectionHeader;
