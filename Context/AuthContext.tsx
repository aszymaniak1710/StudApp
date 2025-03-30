import React, { createContext, useContext, useState } from 'react';

// Tworzymy kontekst
const AuthContext = createContext();

// Dostęp do stanu autoryzacji
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider, który dostarcza stan aplikacji
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Domyślnie niezalogowany
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => setIsAuthenticated(true); // Funkcja logowania
  const logout = () => setIsAuthenticated(false); // Funkcja wylogowania
  const admin = () => setIsAdmin(true);
  const notadmin = () => setIsAdmin(false);


  return (
    <AuthContext.Provider value={{ isAuthenticated,isAdmin, login, logout, admin, notadmin }}>
      {children}
    </AuthContext.Provider>
  );
};
