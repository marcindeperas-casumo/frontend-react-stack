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
