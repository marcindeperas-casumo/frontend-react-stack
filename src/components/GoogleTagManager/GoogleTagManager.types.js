// @flow
export type GTMDataLayer = {
  dataLayer: Object,
  dataLayerName: string,
};

export type GTMScriptParams = {
  dataLayer?: $PropertyType<GTMDataLayer, "dataLayer">,
  dataLayerName?: $PropertyType<GTMDataLayer, "dataLayerName">,
  containerId: string,
};

export type GTMEventParams<T> = {
  event: string,
  dataLayerName?: string,
  payload?: T,
};
