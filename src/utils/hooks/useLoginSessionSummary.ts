// @flow
import * as React from "react";
import {
  getLoginSessionSummary,
  type LoginSessionSummary,
} from "Api/api.esLoginSessionSummary";
import { useJurisdiction } from "Utils/hooks";

export type UseLoginSessionSummary = {
  loginSessionSummary: ?LoginSessionSummary,
};

export function useLoginSessionSummary(): UseLoginSessionSummary {
  const { isDGOJ } = useJurisdiction();
  const [
    loginSessionSummary,
    setLoginSessionSummary,
  ] = React.useState<?LoginSessionSummary>(null);

  React.useEffect(() => {
    if (isDGOJ) {
      getLoginSessionSummary().then(resp => setLoginSessionSummary(resp));
    }
  }, [isDGOJ]);

  return {
    loginSessionSummary,
  };
}
