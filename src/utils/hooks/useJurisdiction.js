// @flow
import { useSelector } from "react-redux";
import { equals } from "ramda";
import { jurisdictionSelector } from "Models/handshake";

type UseJurisdictionType = {
  jurisdiction: string,
  isDGOJ: boolean,
};

export function useJurisdiction(): UseJurisdictionType {
  const jurisdiction = useSelector(jurisdictionSelector);

  return {
    jurisdiction,
    isDGOJ: equals("DGOJ")(jurisdiction),
  };
}
