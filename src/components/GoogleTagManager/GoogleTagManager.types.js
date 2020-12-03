// @flow
export type GTMDataLayer = {
  dataLayer: Object,
};

export type GTMScriptParams = {
  dataLayer?: $PropertyType<GTMDataLayer, "dataLayer">,
  containerId: string,
};

export type GTMEventParams = {
  event: string,
  payload?: Object,
};

export type TSharedEventConfig = {
  userId: string,
  testSubjectId?: string,
  affTrackId?: string,
  btag?: string,
  userStatus: "Logged-In" | "Logged-Out",
};
