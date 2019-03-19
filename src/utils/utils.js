import { assocPath, either, isEmpty, isNil, splitEvery } from "ramda";
import { ENVS } from "Src/constants";

const NODE_ENV = process.env.NODE_ENV || "";

export const isNilOrEmpty = either(isNil, isEmpty);

export const getEnv = (nodeEnv = NODE_ENV, windowObject = window) => {
  const hostname = windowObject.location.hostname;
  const env = ENVS[nodeEnv.toUpperCase()] || ENVS.DEVELOPMENT;
  const isLiveSite = hostname.match("casumo.com") !== null;
  const isProductionEnv = env === ENVS.PRODUCTION;

  if (isProductionEnv && isLiveSite) {
    return ENVS.PRODUCTION;
  }

  if (isProductionEnv && !isLiveSite) {
    return ENVS.TEST;
  }

  return env;
};

export const isEnvProduction = () => getEnv() === ENVS.PRODUCTION;

export const isEnvDevelopment = () => getEnv() === ENVS.DEVELOPMENT;

export const bridgeFactory = () => {
  const obj = {};
  return {
    on: (ev, cb) => {
      if (!obj[ev]) {
        // eslint-disable-next-line fp/no-mutation
        obj[ev] = [];
      }

      // eslint-disable-next-line fp/no-mutating-methods
      obj[ev].push(cb);
    },
    emit: (ev, data) => {
      console.log("🌈 Emitting event", { ev, data }); // eslint-disable-line no-console

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    },
  };
};

export const composePromises = (...fns) => iv =>
  fns.reduceRight(async (acc, curr) => curr(await acc), iv);

export const decodeString = s =>
  new DOMParser().parseFromString(
    `<!doctype html><body>${s}</body></html>`,
    "text/html"
  ).body.textContent;

/**
 * Use this method when you want to know which parts of the string are the
 * "matched" and "unmatched" groups for a given search term.
 * @param {string} str String to search into
 * @param {string} searchTerm Search term to search into a given string
 */
export const matchingGroups = (str, searchTerm) => {
  const matchType = (type, value) => ({
    type,
    value,
  });

  const unmatched = value => matchType("unmatched", value);
  const matched = value => matchType("matched", value);

  const normalizedStr = str.toLowerCase();
  const normalizedTarget = searchTerm.toLowerCase();

  const searchIdx = normalizedStr.search(normalizedTarget);
  const found = searchIdx >= 0;

  if (!found || searchTerm === "") {
    return [unmatched(str)];
  }

  const matchers = [];

  /* eslint-disable fp/no-mutating-methods */
  if (searchIdx !== 0) {
    matchers.push(unmatched(str.substr(0, searchIdx)));
  }

  matchers.push(matched(str.substr(searchIdx, searchTerm.length)));

  if (searchIdx + searchTerm.length < str.length) {
    matchers.push(
      unmatched(str.substr(searchIdx + searchTerm.length, str.length - 1))
    );
  }
  /* eslint-enable fp/no-mutating-methods */

  return matchers;
};

export const makeProtocolAwareUrl = url => {
  const { hostname, protocol } = window.location;

  const startsWith = (string, keyword) =>
    string.slice(0, keyword.length) === keyword;

  const replaceInBeginning = (string, from, to) =>
    `${to}${string.slice(from.length)}`;

  if (startsWith(url, "//")) {
    return replaceInBeginning(url, "//", `${protocol}//`);
  }

  if (startsWith(url, "/")) {
    return replaceInBeginning(url, "/", `${protocol}//${hostname}/`);
  }

  return url;
};

export const stringToHTML = string => {
  return { __html: string };
};

export const generateColumns = (items, numberByColumns = 3) =>
  splitEvery(numberByColumns, items);

// TODO: make this a component
export const renderBets = o =>
  o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "";

export const sanitizeObject = (obj, keysToSanitize = []) => {
  return keysToSanitize
    .map(key => key.split("."))
    .reduce((acc, key) => assocPath(key, "******", acc), obj);
};

export const injectScript = url =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    /* eslint-disable fp/no-mutation */
    script.onload = () => resolve();
    script.onerror = () => reject(`Script url, failed to load`);

    script.src = url;
    /* eslint-enable fp/no-mutation */

    document.head.appendChild(script);
  });
