import { createContext, useContext } from "react";

const Context = createContext(null);

export function SettingsContextProvider({ children, value }) {
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Context must be used within its provider.');
  }

  return context;
}
