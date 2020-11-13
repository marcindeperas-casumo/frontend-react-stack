// @flow
export type GTMDataLayer = {
  dataLayer: Object,
  dataLayerName: string,
};

export type GTMScriptParams = ?GTMDataLayer & {
  containerId: string,
};

export type GTMEventParams<T> = {
  event: string,
  dataLayerName?: string,
  payload?: T,
};
