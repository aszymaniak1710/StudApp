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

  const login = () => setIsAuthenticated(true); // Funkcja logowania
  const logout = () => setIsAuthenticated(false); // Funkcja wylogowania

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
