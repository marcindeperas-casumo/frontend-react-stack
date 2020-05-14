// @flow
import { useSelector } from "react-redux";
import { equals } from "ramda";
import { jurisdictionSelector } from "Models/handshake";

type UseJurisdictionType = {
  jurisdiction: string,
  isDGOJ: boolean,
  isDGA: boolean,
  isMGA: boolean,
  isSGA: boolean,
  isUKGC: boolean,
};

export function useJurisdiction(): UseJurisdictionType {
  const jurisdiction = useSelector(jurisdictionSelector);

  return {
    isDGA: equals("DGA")(jurisdiction),
    isDGOJ: equals("DGOJ")(jurisdiction),
    isMGA: equals("MGA")(jurisdiction),
    isSGA: equals("SGA")(jurisdiction),
    isUKGC: equals("UKGC")(jurisdiction),
    jurisdiction,
  };
}
