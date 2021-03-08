export type GTMDataLayer = {
  dataLayer: Object;
};

export type GTMScriptParams = {
  dataLayer?: GTMDataLayer["dataLayer"];
  containerId: string;
};

export type GTMEventParams = {
  event: string;
  payload?: Object;
};

export type TSharedEventConfig = {
  userId: string;
  testSubjectId?: string;
  btag?: string; // todo: confirm if still needed
  userStatus: "Logged-In" | "Logged-Out";
};
