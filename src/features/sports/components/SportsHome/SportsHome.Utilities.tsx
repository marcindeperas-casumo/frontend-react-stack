import { isMobile, isTablet } from "Components/ResponsiveLayout";
import {
  MAXIMUM_EVENT_ODD_ALLOWED,
  OUTCOME_TYPE_OT_ONE,
  OUTCOME_TYPE_OT_TWO,
} from "./SportsHome.constants";
import { SportsHomeEvent, SportsHomePopularBetsConfigurations } from "./types";

class SportsHomeUtilities {
  getNumberOfEventsPerDevice = (
    data: SportsHomePopularBetsConfigurations
  ): number => {
    if (isMobile()) {
      return data.numberOfEventsMobile;
    }

    if (isTablet()) {
      return data.numberOfEventsTablet;
    }

    return data.numberOfEventsDesktop;
  };

  isValidEventOutcome = (event: SportsHomeEvent): Boolean => {
    return !event.outcomes.find(
      x =>
        (x.type === OUTCOME_TYPE_OT_ONE || x.type === OUTCOME_TYPE_OT_TWO) &&
        x.odds > MAXIMUM_EVENT_ODD_ALLOWED
    );
  };
}

export default new SportsHomeUtilities();
