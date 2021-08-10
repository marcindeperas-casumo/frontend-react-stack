import { isMobile, isTablet, isDesktop } from "Components/ResponsiveLayout";
import { DEVICES } from "Src/constants";

export const getDeviceType = (): string => {
  if (isMobile()) {
    return DEVICES.MOBILE;
  }
  if (isTablet()) {
    return DEVICES.TABLET;
  }
  if (isDesktop()) {
    return DEVICES.DESKTOP;
  }
};
