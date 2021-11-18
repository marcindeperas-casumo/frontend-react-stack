import { isMobile, isTablet } from "Components/ResponsiveLayout";
import {
  MAXIMUM_EVENT_ODD_ALLOWED,
  OUTCOME_TYPE_OT_CROSS,
  OUTCOME_TYPE_OT_ONE,
  OUTCOME_TYPE_OT_TWO,
} from "./SportsHome.constants";
import {
  PopularEventsWidgetConfigurations,
  SportsHomeEvent,
  SportsHomeOutcome,
} from "./types";

class SportsHomeUtilities {
  getNumberOfEventsPerDevice = (
    data: PopularEventsWidgetConfigurations
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
    const outcomeOne = event.outcomes.find(x => x.type === OUTCOME_TYPE_OT_ONE);
    const outcomeTwo = event.outcomes.find(x => x.type === OUTCOME_TYPE_OT_TWO);
    const outcomeDraw = event.outcomes.find(
      x => x.type === OUTCOME_TYPE_OT_CROSS
    );

    // if 1 is disabled, check 2
    if (outcomeOne?.isDisabled && !outcomeTwo?.isDisabled) {
      return this.checkOddsWithinLimits(outcomeTwo);
    }

    // if 2 is disabled, check 1
    if (outcomeTwo?.isDisabled && !outcomeOne?.isDisabled) {
      return this.checkOddsWithinLimits(outcomeOne);
    }

    // if 1 and 2 are disabled, check draw
    if (
      outcomeOne?.isDisabled &&
      outcomeTwo?.isDisabled &&
      !outcomeDraw?.isDisabled
    ) {
      return this.checkOddsWithinLimits(outcomeDraw);
    }

    return true;
  };

  checkOddsWithinLimits(outcome: SportsHomeOutcome) {
    return outcome.odds < MAXIMUM_EVENT_ODD_ALLOWED;
  }
}

export default new SportsHomeUtilities();
