// @flow
export const IN_PLAY_URL_PART = "in-play";
export const SPORTS_HOME_PAGE_PATH = "home";
export const SPORTS_COUPON_PAGE_PATH = "coupon";
export const ALL_SPORTS_PATH = `filter/all/all/all/all/${IN_PLAY_URL_PART}`;
export const isInPlayHash = (hash: string) => hash.includes(IN_PLAY_URL_PART);

export const activeIndicator = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect x="20" y="19" width="22" height="22" rx="11" fill="currentColor"/></svg>`;
