import { prop, splitEvery, assocPath } from "ramda";
import { ENVS } from "Src/constants";

const { log } = console;

export const getEnv = () => {
  const env = process.env.NODE_ENV || "";
  const selectedEnv = ENVS[env.toUpperCase()];

  return selectedEnv || ENVS.DEVELOPMENT;
};

export const isEnvProduction = () => getEnv() === ENVS.PRODUCTION;

export const isEnvDevelopment = () => getEnv() === ENVS.DEVELOPMENT;

export const isEnvTest = () => getEnv() === ENVS.TEST;

export const sleep = ms => data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};

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
      log("🌈 Emitting event", { ev, data });

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    },
  };
};

export const cacheLocallyForMs = ms => {
  // eslint-disable-next-line fp/no-let
  let lastValue = {
    lastUpdated: 0,
  };

  log(`🏝 Setting up local cache for ${ms}ms`);

  return performCall => (...args) => {
    const now = new Date().getTime();
    log(`🏝 Last updated: ${lastValue.lastUpdated}, now: ${now}`);
    if (now - lastValue.lastUpdated <= ms) {
      log(
        `🏝 Still ${ms -
          (now - lastValue.lastUpdated)}ms before the cache expires.`,
        lastValue
      );
      return lastValue.success
        ? Promise.resolve(lastValue.value)
        : Promise.reject(lastValue.error);
    }

    log(`🏝 Returning a promise to perform work`);
    return new Promise((resolve, reject) => {
      log(`🏝 Performing work`);
      try {
        const result = performCall(...args);
        resolve(result);
      } catch (e) {
        log("CACHE ERROR", e);
        reject(e);
      }
    })
      .then(value => {
        // eslint-disable-next-line fp/no-mutation
        lastValue = {
          success: true,
          value,
          lastUpdated: new Date().getTime(),
        };
        log(`🏝 Work performed updating internal values`, {
          lastValue,
        });

        return value;
      })
      .catch(e => {
        console.error("performCall Error", e);

        // eslint-disable-next-line fp/no-mutation
        lastValue = {
          success: false,
          error: e,
          lastUpdated: new Date().getTime(),
        };

        return Promise.reject(e);
      });
  };
};

export const commonFetch = (url, options) => {
  return fetch("/api/" + url, {
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    ...options,
  })
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line fp/no-throw
        throw new Error(response.statusText);
      }
      return response;
    })
    .then(response => response.text())
    .then(text => {
      if (text === "") {
        return {};
      }

      return JSON.parse(text);
    });
};

export const usingPOST = (url, options) =>
  commonFetch(url, {
    method: "POST",
    ...options,
  });

export const usingGET = commonFetch;

export const trace = x => {
  log(x);
  return x;
};

export const getBodyTag = () => window.document.getElementsByTagName("body")[0];
export const getHostElement = id => {
  const el = window.document.getElementById(id);
  if (!el) {
    console.error(
      `Trying to find element with id #${id} but it was not found. Going to fallback on the body tag instead.`
    );
    return getBodyTag();
  }

  return el;
};

export const composePromises = (...fns) => iv =>
  fns.reduceRight(async (acc, curr) => curr(await acc), iv);

export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    // eslint-disable-next-line fp/no-mutation
    obj[item[key]] = item;
    return obj;
  }, {});
};

export const SimpleCache = () => {
  /* eslint-disable fp/no-let */
  let internalValue = null;
  let valueSet = false;
  /* eslint-enable fp/no-let */

  const isEmpty = () => {
    return !valueSet;
  };

  const get = () => {
    return internalValue;
  };

  /* eslint-disable fp/no-mutation */
  const set = newValue => {
    internalValue = newValue;
    valueSet = true;
  };

  const invalidate = () => {
    internalValue = null;
    valueSet = false;
  };
  /* eslint-enable fp/no-mutation */

  return {
    isEmpty,
    get,
    set,
    invalidate,
  };
};

export const cacheFunction = ({ fn, cache = SimpleCache() }) => async () => {
  // NOTE: The return cached function does not accept any arguments. In case you
  // want to start accepting arguments, make sure that the cache is also based
  // on the arguments.
  if (cache.isEmpty()) {
    cache.set(await fn());
  }

  return cache.get();
};

export const ServiceConfig = ({ defaultOptions, cache }) => {
  return {
    get: () => {
      return cache.get();
    },
    set: options => {
      cache.set({
        ...cache.get(),
        ...defaultOptions,
        ...options,
      });
    },
  };
};

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

export const fromCommonHandshake = k => prop(`common/composition/${k}`);

export const makeProtocolAwareUrl = url => {
  const { hostname, protocol } = window.location;

  const startsWith = (string, keyword) =>
    string.slice(0, keyword.length) === keyword;

  const replaceInBeginning = (string, from, to) =>
    `${to}${string.slice(from.length)}`;

  if (startsWith(url, "//"))
    return replaceInBeginning(url, "//", `${protocol}//`);

  if (startsWith(url, "/"))
    return replaceInBeginning(url, "/", `${protocol}//${hostname}/`);

  return url;
};

export const stringToHTML = string => {
  return { __html: string };
};

export const generateColumns = (items, numberByColumns = 3) =>
  splitEvery(numberByColumns, items);

export const renderBets = o =>
  o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "";

export const sanitizeObject = (obj, keysToSanitize = []) => {
  return keysToSanitize
    .map(key => key.split("."))
    .reduce((acc, key) => assocPath(key, "******", acc), obj);
};

// Call this to disable react DevTools integration, meaning that this will
// prevent the react DevTools extension to scan the elements and show anything
// react related in the extension tab.
// We need it to prevent people to look into our React tree with the extension
// in production.
export const disableReactDevTools = () => {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // eslint-disable-next-line fp/no-loops, fp/no-let
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      // eslint-disable-next-line fp/no-mutation
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
};
