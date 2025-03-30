import React, { createContext, useState, useContext } from 'react';
//import PointsView from "../Views/PointsView"; // Import PointsView

// Tworzymy kontekst
const AppVariables = createContext();

// Tworzymy dostawcę kontekstu
export const AppProvider = ({ children }) => {
  //const [baseURL, setURL] = useState('http://192.168.1.17:8080');

  return (
    <AppVariables.Provider value={{ baseURL, setURL }}>
      {children}
    </AppVariables.Provider>
  );
};

// Hook do używania kontekstu w komponentach
//export const useAppContext = () => useContext(AppVariables);
export const baseUrl = 'http://192.168.1.26:8080';