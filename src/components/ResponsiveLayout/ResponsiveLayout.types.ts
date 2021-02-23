//@flow
export const ORIENTATION_VALUES = Object.freeze({
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait",
});

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type ORIENTATION_TYPE = $Values<typeof ORIENTATION_VALUES>;
