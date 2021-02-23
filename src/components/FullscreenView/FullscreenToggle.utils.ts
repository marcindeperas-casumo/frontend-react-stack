// @flow
export const supportsTogglingFullscreen = (element: ?HTMLElement) =>
  Boolean(element && element.requestFullscreen);
