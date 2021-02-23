// @flow
import * as React from "react";
import {
  getLoginSessionSummary,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"../../api/api.esLoginSessionSummary"' has... Remove this comment to see the full error message
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
