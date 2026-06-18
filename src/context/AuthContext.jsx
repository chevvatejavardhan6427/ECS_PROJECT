import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const storageKeys = {
  token: 'lifelink-token',
  user: 'lifelink-user',
};

const loadStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(storageKeys.user);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => window.localStorage.getItem(storageKeys.token));
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(Boolean(window.localStorage.getItem(storageKeys.token)));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);

    authService
      .getProfile(token)
      .then((profile) => {
        if (!active) {
          return;
        }

        setUser(profile.user || profile);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setToken(null);
        setUser(null);
        window.localStorage.removeItem(storageKeys.token);
        window.localStorage.removeItem(storageKeys.user);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      window.localStorage.removeItem(storageKeys.token);
      return;
    }

    window.localStorage.setItem(storageKeys.token, token);
  }, [token]);

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem(storageKeys.user);
      return;
    }

    window.localStorage.setItem(storageKeys.user, JSON.stringify(user));
  }, [user]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      updateUser: setUser,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
