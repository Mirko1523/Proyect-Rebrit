import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, token: null });

  useEffect(() =>{
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  if(token && user){
    setAuth ({ isAuthenticated: true, user, token})
  }
  }, []);


  const login = (user, token) => {
    setAuth({ isAuthenticated: true, user, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
     localStorage.removeItem('token');
    localStorage.removeItem('user');
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
