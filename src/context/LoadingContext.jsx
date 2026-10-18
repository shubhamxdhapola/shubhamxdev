import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  hasLoaded: false,
  setHasLoaded: () => {},
  isInitialLoading: true,
});

export function LoadingProvider({ children }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        hasLoaded,
        setHasLoaded,
        isInitialLoading: !hasLoaded,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
