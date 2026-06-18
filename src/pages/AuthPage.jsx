import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import QuoteStrip from '../components/QuoteStrip';
import { bloodGroups, quotes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useGeoLocation } from '../hooks/useGeoLocation';
import styles from './AuthPage.module.css';

const initialRegisterForm = {
  name: '',
  email: '',
  password: '',
  bloodGroup: 'O+',
  role: 'donor',
  age: 24,
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const { coords, error: locationError, requestLocation } = useGeoLocation();

  useEffect(() => {
    setSearchParams(mode === 'register' ? { mode: 'register' } : {});
  }, [mode, setSearchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const helperText = useMemo(
    () =>
      mode === 'login'
        ? 'Use your existing LifeLink account to access donor matching, emergency alerts, and health eligibility records.'
        : 'Create a donor or recipient account with GPS-assisted city-level location data. Exact coordinates stay protected. Admin accounts are provisioned separately.',
    [mode]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(loginForm);
      } else {
        await register({
          ...registerForm,
          age: Number(registerForm.age),
          location: {
            lat: coords.lat,
            lng: coords.lng,
          },
        });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to continue. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section container">
      <div className={styles.layout}>
        <div className={`${styles.panel} surface`}>
          <div className={styles.tabRow}>
            <button type="button" className={mode === 'login' ? 'button' : 'buttonGhost'} onClick={() => setMode('login')}>
              Login
            </button>
            <button type="button" className={mode === 'register' ? 'button' : 'buttonGhost'} onClick={() => setMode('register')}>
              Register
            </button>
          </div>

          <div className="pageIntro">
            <span className="badge">Secure access</span>
            <h1>{mode === 'login' ? 'Welcome back to LifeLink' : 'Create your LifeLink profile'}</h1>
            <p>{helperText}</p>
          </div>

          <form className="stackLg" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <div className="formGrid">
                <label className="label">
                  Full name
                  <input
                    className="input"
                    value={registerForm.name}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>
                <label className="label">
                  Email
                  <input
                    className="input"
                    type="email"
                    value={registerForm.email}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>
                <label className="label">
                  Password
                  <input
                    className="input"
                    type="password"
                    minLength="6"
                    value={registerForm.password}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                    required
                  />
                </label>
                <label className="label">
                  Age
                  <input
                    className="input"
                    type="number"
                    min="18"
                    max="65"
                    value={registerForm.age}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, age: event.target.value }))}
                    required
                  />
                </label>
                <label className="label">
                  Blood group
                  <select
                    className="select"
                    value={registerForm.bloodGroup}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, bloodGroup: event.target.value }))}
                  >
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="label">
                  Role
                  <select
                    className="select"
                    value={registerForm.role}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, role: event.target.value }))}
                  >
                    <option value="donor">Donor</option>
                    <option value="recipient">Recipient</option>
                  </select>
                </label>
              </div>
            ) : (
              <div className="stackMd">
                <label className="label">
                  Email
                  <input
                    className="input"
                    type="email"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>
                <label className="label">
                  Password
                  <input
                    className="input"
                    type="password"
                    minLength="6"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                    required
                  />
                </label>
              </div>
            )}

            <div className={styles.noticeRow}>
              <div className="subtlePanel">
                <strong>Location snapshot</strong>
                <p>
                  {locationError || `Approximate coordinates ready: ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`}
                </p>
              </div>
              <button type="button" className="buttonGhost" onClick={requestLocation}>
                Refresh GPS
              </button>
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}

            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in securely' : 'Create account'}
            </button>
          </form>
        </div>

        <div className={`${styles.sidebar} flow`}>
          <div className="surface subtlePanel">
            <h3>Preview credentials after seeding</h3>
            <p><strong>Admin:</strong> admin@lifelink.app / Password123!</p>
            <p><strong>Donor:</strong> donor.riya@lifelink.app / Password123!</p>
          </div>
          <QuoteStrip quotes={quotes.slice(0, 2)} />
          <div className="surface subtlePanel">
            <h3>What happens next</h3>
            <p>Login unlocks donor matching, secure contact requests, verified camp signups, emergency alerts, and organ pledge tracking.</p>
            <Link to="/awareness" className="buttonSecondary">Read organ donation myths vs facts</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
