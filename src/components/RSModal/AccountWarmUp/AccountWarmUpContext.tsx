import * as React from "react";
import { usePlayerWarmUpDetails } from "Utils/hooks";
import type { TPlayerWarmUpDetailsResponse } from "Models/accountWarmUp";

type AccountWarmUpContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_CONTEXT = {
  playerId: "",
  warmupTimeEnd: "",
  verified: false,
  inWarmupPhase: false,
};

export const AccountWarmUpContext = React.createContext<TPlayerWarmUpDetailsResponse>(
  DEFAULT_CONTEXT
);

export const AccountWarmUpContextProvider = ({
  children,
}: AccountWarmUpContextProviderProps) => {
  const { loading, details } = usePlayerWarmUpDetails();
  if (loading) {
    return (
      <AccountWarmUpContext.Provider value={DEFAULT_CONTEXT}>
        {children}
      </AccountWarmUpContext.Provider>
    );
  }
  return (
    <AccountWarmUpContext.Provider value={details}>
      {children}
    </AccountWarmUpContext.Provider>
  );
};

export const useAccountWarmUpContext = () => {
  return React.useContext(AccountWarmUpContext);
};
