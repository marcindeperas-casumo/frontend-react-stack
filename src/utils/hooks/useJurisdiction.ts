import { useSelector } from "react-redux";
import { equals } from "ramda";
import { jurisdictionSelector } from "Models/handshake";
import { TJurisdiction } from "Src/constants";

type UseJurisdictionType = {
  jurisdiction: TJurisdiction;
  isDGOJ: boolean;
  isDGA: boolean;
  isMGA: boolean;
  isSGA: boolean;
  isUKGC: boolean;
  isGGL: boolean;
  isGRA: boolean;
  isAGCO: boolean;
};

export function useJurisdiction(): UseJurisdictionType {
  const jurisdiction = useSelector(jurisdictionSelector) as TJurisdiction;

  return {
    isDGA: equals("DGA")(jurisdiction),
    isDGOJ: equals("DGOJ")(jurisdiction),
    isMGA: equals("MGA")(jurisdiction),
    isSGA: equals("SGA")(jurisdiction),
    isUKGC: equals("UKGC")(jurisdiction),
    isGGL: equals("GGL")(jurisdiction),
    isGRA: equals("GRA")(jurisdiction),
    isAGCO: equals("AGCO")(jurisdiction),
    jurisdiction,
  };
}
