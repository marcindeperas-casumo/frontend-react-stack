// @flow
// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export const supportsTogglingFullscreen = (element: ?HTMLElement) =>
  Boolean(element && element.requestFullscreen);
