import { bloodGroups } from '../data/mockData';
import styles from './FilterBar.module.css';

const radiusOptions = [5, 10, 20, 50];

const FilterBar = ({ filters, onChange, onReset, locationStatus, action }) => (
  <div className={`${styles.bar} surface`}>
    <div className={styles.fields}>
      <label className="label">
        Blood group
        <select
          className="select"
          value={filters.bloodGroup}
          onChange={(event) => onChange({ bloodGroup: event.target.value })}
        >
          <option value="">All groups</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </label>

      <label className="label">
        Distance radius
        <select className="select" value={filters.radius} onChange={(event) => onChange({ radius: event.target.value })}>
          {radiusOptions.map((radius) => (
            <option key={radius} value={radius}>
              {radius} km
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className={styles.actions}>
      <p>{locationStatus}</p>
      <div className={styles.buttons}>
        <button type="button" className="buttonGhost" onClick={onReset}>
          Reset
        </button>
        {action}
      </div>
    </div>
  </div>
);

export default FilterBar;
