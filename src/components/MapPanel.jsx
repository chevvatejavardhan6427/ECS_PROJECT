import { useEffect } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import styles from './MapPanel.module.css';

const colorByType = {
  donor: '#ff6b6b',
  hospital: '#4caf50',
  bank: '#ef4444',
  camp: '#f59e0b',
  request: '#111827',
};

const labelByType = {
  donor: 'Donor',
  hospital: 'Hospital',
  bank: 'Blood bank',
  camp: 'Camp',
  request: 'Request',
};

const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
};

const MapPanel = ({ center, markers, title = 'Live map' }) => {
  const visibleTypes = [...new Set(markers.map((marker) => marker.type))];

  return (
    <section className={`${styles.panel} card`}>
      <div className={styles.header}>
        <div>
          <span className="badge">Map view</span>
          <h3>{title}</h3>
        </div>
        <div className={styles.legend}>
          {visibleTypes.map((type) => (
            <span key={type}>
              <i style={{ background: colorByType[type] || '#ff6b6b' }} /> {labelByType[type] || type}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.mapWrap}>
        <MapContainer center={[center.lat, center.lng]} zoom={12} scrollWheelZoom className={styles.map}>
          <RecenterMap center={[center.lat, center.lng]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <CircleMarker
              key={marker.id}
              center={[marker.location.lat, marker.location.lng]}
              radius={10}
              pathOptions={{ color: colorByType[marker.type] || '#ff6b6b', fillOpacity: 0.85 }}
            >
              <Popup>
                <strong>{marker.name}</strong>
                <br />
                {marker.detail}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default MapPanel;
