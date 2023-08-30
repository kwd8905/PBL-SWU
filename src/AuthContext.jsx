import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggined, setIsLoggined] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggined, setIsLoggined }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
