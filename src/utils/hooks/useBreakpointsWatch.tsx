import useMedia from "react-use/lib/useMedia";
import {
  breakpointsGoals,
  getMediaQuery,
} from "Components/ResponsiveLayout/ResponsiveLayout.utils";

export const useBreakpointsWatch = () => {
  return {
    gtMobile: useMedia(getMediaQuery(breakpointsGoals.gtMobile)),
    gtPhablet: useMedia(getMediaQuery(breakpointsGoals.gtPhablet)),
    gtTablet: useMedia(getMediaQuery(breakpointsGoals.gtTablet)),
  };
};
