import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/api';

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const saveSession = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return;
    }

    api('/auth/me')
      .then(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      })
      .catch(clearSession)
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const session = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    saveSession(session);
  };

  const signup = async (account) => {
    const session = await api('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(account)
    });
    saveSession(session);
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout: clearSession }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
