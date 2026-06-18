import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmergencyButton from './EmergencyButton';
import Footer from './Footer';
import Navbar from './Navbar';
import styles from './AppShell.module.css';

const AppShell = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isPresentationRoute = location.pathname === '/presentation';
  const showEmergencyButton = isAuthenticated && !['/emergency', '/auth'].includes(location.pathname);

  return (
    <div className={styles.shell}>
      {isPresentationRoute ? null : <div className={styles.orbOne} />}
      {isPresentationRoute ? null : <div className={styles.orbTwo} />}
      {isPresentationRoute ? null : <Navbar />}
      <main>
        <Outlet />
      </main>
      {isPresentationRoute ? null : <Footer />}
      {showEmergencyButton && !isPresentationRoute ? <EmergencyButton /> : null}
    </div>
  );
};

export default AppShell;
