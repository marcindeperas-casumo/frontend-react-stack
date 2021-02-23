// @flow
import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getFirstTACApproval, getLastTACApproval } from "Api/api.tac";
import { updateEntity } from "Models/schema";
import { getAcknowledgements, getRelevantVersionsSlugs } from "./tac.selectors";

/*:: const __getAcknowledgements = getAcknowledgements(); */
// @ts-expect-error ts-migrate(2552) FIXME: Cannot find name '__getAcknowledgements'. Did you ... Remove this comment to see the full error message
export function useTACAcknowledgements(): typeof __getAcknowledgements {
  const dispatch = useDispatch();
  React.useEffect(() => {
    Promise.all([getFirstTACApproval(), getLastTACApproval()]).then(
      ([first, last]) => {
        dispatch(updateEntity({ acknowledgements: { first, last } }));
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return useSelector(getAcknowledgements, shallowEqual);
}

/*:: const __getRelevantVersionsSlugs = getRelevantVersionsSlugs(); */
// @ts-expect-error ts-migrate(2552) FIXME: Cannot find name '__getRelevantVersionsSlugs'. Did... Remove this comment to see the full error message
export function useRelevantVersionsSlugs(): typeof __getRelevantVersionsSlugs {
  return useSelector(getRelevantVersionsSlugs, shallowEqual);
}
