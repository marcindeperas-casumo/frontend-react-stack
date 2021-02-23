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
  isGGL: boolean,
};

export function useJurisdiction(): UseJurisdictionType {
  const jurisdiction = useSelector(jurisdictionSelector);

  return {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isDGA: equals("DGA")(jurisdiction),
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isDGOJ: equals("DGOJ")(jurisdiction),
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isMGA: equals("MGA")(jurisdiction),
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isSGA: equals("SGA")(jurisdiction),
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isUKGC: equals("UKGC")(jurisdiction),
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    isGGL: equals("GGL")(jurisdiction),
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
    jurisdiction,
  };
}
