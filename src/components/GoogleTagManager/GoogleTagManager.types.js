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

export type GTMEventParams = {
  event: string,
  dataLayerName?: $PropertyType<GTMDataLayer, "dataLayerName">,
  payload?: Object,
};
