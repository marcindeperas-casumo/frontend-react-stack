import * as React from "react";
import { getLoginSessionSummary } from "Api/api.esLoginSessionSummary";
import type { LoginSessionSummary } from "Api/api.esLoginSessionSummary";
import { useJurisdiction } from "Utils/hooks";

export type UseLoginSessionSummary = {
  loginSessionSummary: LoginSessionSummary | undefined;
};

export function useLoginSessionSummary(): UseLoginSessionSummary {
  const { isDGOJ } = useJurisdiction();
  const [
    loginSessionSummary,
    setLoginSessionSummary,
  ] = React.useState<LoginSessionSummary | null>(null);

  React.useEffect(() => {
    if (isDGOJ) {
      getLoginSessionSummary().then(resp => setLoginSessionSummary(resp));
    }
  }, [isDGOJ]);

  return {
    loginSessionSummary,
  };
}
