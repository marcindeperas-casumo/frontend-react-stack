// @flow
export type GTMDataLayer = {
  dataLayer: Object,
  dataLayerName: string,
};

export type GTMScriptParams = ?GTMDataLayer & {
  containerId: string,
};

export type GTMEventParams<T> = {
  dataLayerName: string,
  event: string,
  payload: T,
};
