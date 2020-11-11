// @flow
export type TDataLayer = {
  dataLayer: Object,
  dataLayerName: string,
};

export type TSnippet = {
  gtmDataLayer: string,
  gtmScript: string,
};

export type TSnippetParams = ?TDataLayer & {
  containerId: string,
};

export type EventParams<T> = {
  dataLayerName: string,
  event: string,
  payload: T,
};
