import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService.js';
import { authService } from '../services/authService.js';

const AuthContext = React.createContext({
  isChecked: false,
  currentUser: null,
  checkAuth: () => {},
  activate: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isChecked, setChecked] = useState(true);

  async function activate(activationToken) {
    const { accessToken, user } = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setCurrentUser(user);
    } catch (error) {
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }) {
    const { accessToken, user } = await authService.login(email, password);

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      checkAuth,
      activate,
      login,
      logout,
    }),
    [currentUser, isChecked],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
