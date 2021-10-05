import { isMobile, isTablet } from "Components/ResponsiveLayout";
import { SportsHomePopularBetsConfigurations } from "./types";

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
}

export default new SportsHomeUtilities();
