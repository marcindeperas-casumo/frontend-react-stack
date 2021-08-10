import { isMobile, isTablet, isDesktop } from "Components/ResponsiveLayout";

export const getDeviceType = (): string => {
  const mobile = "mobile";
  const tablet = "tablet";
  const desktop = "desktop";

  if (isMobile()) {
    return mobile;
  }
  if (isTablet()) {
    return tablet;
  }
  if (isDesktop()) {
    return desktop;
  }
};
