// authContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, token: null });

  const login = (user, token) => {
    setAuth({ isAuthenticated: true, user, token });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
