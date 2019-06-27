//@flow
export const ORIENTATION_VALUES = Object.freeze({
  LANDSCAPE: "landscape",
  PORTRAIT: "portrait",
});

export type ORIENTATION_TYPE = $Values<typeof ORIENTATION_VALUES>;
