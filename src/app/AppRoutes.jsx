import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/AppShell';
import LoadingPulse from '../components/LoadingPulse';
import AdminPage from '../pages/AdminPage';
import AuthPage from '../pages/AuthPage';
import AwarenessPage from '../pages/AwarenessPage';
import CampsPage from '../pages/CampsPage';
import DashboardPage from '../pages/DashboardPage';
import EmergencyPage from '../pages/EmergencyPage';
import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import PresentationPage from '../pages/PresentationPage';
import ProfilePage from '../pages/ProfilePage';
import SearchPage from '../pages/SearchPage';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingPulse label="Restoring your secure session" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/presentation" element={<PresentationPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/camps" element={<CampsPage />} />
      <Route path="/awareness" element={<AwarenessPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
