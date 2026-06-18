import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUi } from '../context/UiContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, setTheme, language, setLanguage, t } = useUi();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isAuthenticated
    ? [
        { to: '/dashboard', label: t('dashboard') },
        { to: '/search', label: t('donors') },
        { to: '/camps', label: t('camps') },
        { to: '/awareness', label: t('awareness') },
        { to: '/emergency', label: t('emergency') },
        ...(user?.role === 'admin' ? [{ to: '/admin', label: t('admin') }] : []),
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/presentation', label: 'Presentation' },
        { to: '/search', label: t('findBlood') },
        { to: '/awareness', label: t('awareness') },
      ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandIcon}>+</span>
          <span>
            LifeLink
            <small>Blood &amp; Organ Donation Network</small>
          </span>
        </Link>

        <button className={styles.menuButton} onClick={() => setMenuOpen((value) => !value)} type="button">
          Menu
        </button>

        <div className={`${styles.panel} ${menuOpen ? styles.panelOpen : ''}`}>
          <nav className={styles.nav}>
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.controls}>
            <button
              className={styles.utilityButton}
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={t('theme')}
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button
              className={styles.utilityButton}
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              aria-label={t('language')}
            >
              {language === 'en' ? 'EN' : 'HI'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className={styles.profileChip} onClick={() => setMenuOpen(false)}>
                  <span>{user?.name?.slice(0, 1) || 'U'}</span>
                  <div>
                    <strong>{user?.name || 'User'}</strong>
                    <small>{user?.role || 'member'}</small>
                  </div>
                </Link>
                <button type="button" className="buttonGhost" onClick={handleLogout}>
                  {t('logout')}
                </button>
              </>
            ) : (
              <div className={styles.authCtas}>
                <Link to="/auth" className="buttonGhost" onClick={() => setMenuOpen(false)}>
                  {t('login')}
                </Link>
                <Link to="/auth?mode=register" className="button" onClick={() => setMenuOpen(false)}>
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
