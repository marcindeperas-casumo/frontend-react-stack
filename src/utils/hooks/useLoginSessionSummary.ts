import * as React from "react";
import { useSelector } from "react-redux";
import { getLoginSessionSummary } from "Api/api.esLoginSessionSummary";
import type { LoginSessionSummary } from "Api/api.esLoginSessionSummary";
import { useJurisdiction } from "Utils/hooks";
import { sessionIdSelector } from "Models/handshake";

export type UseLoginSessionSummary = {
  loginSessionSummary: LoginSessionSummary | undefined;
};

const fallbackSessionState = { bets: 0, winnings: 0 };

export function useLoginSessionSummary(): UseLoginSessionSummary {
  const { isDGOJ } = useJurisdiction();
  const sessionId = useSelector(sessionIdSelector);
  const [
    loginSessionSummary,
    setLoginSessionSummary,
  ] = React.useState<LoginSessionSummary | null>(null);

  React.useEffect(() => {
    if (isDGOJ && Boolean(sessionId)) {
      getLoginSessionSummary(sessionId)
        .then(setLoginSessionSummary)
        .catch(() => setLoginSessionSummary(fallbackSessionState));
    }
  }, [isDGOJ, sessionId]);

  return {
    loginSessionSummary,
  };
}
