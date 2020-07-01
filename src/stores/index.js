import React, { createContext, useState,useEffect } from "react";
import { AsyncStorage } from 'react-native';
export const StoreContext = createContext();

// Make a Provider
export const StoreProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  
  
  const store = {
    isLoginState: [isLogin, setIsLogin]
   
  };
  
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
