import React from "react";

export const FullscreenViewContext = React.createContext({});

export const FullscreenView = ({ children }) => {
  return (
    <FullscreenViewContext.Provider>{children}</FullscreenViewContext.Provider>
  );
};
