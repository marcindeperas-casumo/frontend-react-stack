// @flow
import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getFirstTACApproval, getLastTACApproval } from "Api/api.tac";
import { updateEntity } from "Models/schema";
import { getAcknowledgements, getRelevantVersionsSlugs } from "./tac.selectors";

/*:: const __getAcknowledgements = getAcknowledgements(); */
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
export function useRelevantVersionsSlugs(): typeof __getRelevantVersionsSlugs {
  return useSelector(getRelevantVersionsSlugs, shallowEqual);
}
