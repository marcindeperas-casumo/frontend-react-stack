export const supportsTogglingFullscreen = (element: HTMLElement | null) =>
  Boolean(element && element.requestFullscreen);
