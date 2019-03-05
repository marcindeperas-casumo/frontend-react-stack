import {
  prop,
  splitEvery,
  assocPath,
  compose,
  flatten,
  join,
  toPairs,
} from "ramda";
import { ENVS } from "Src/constants";
import md5 from "md5";

const { log } = console;
const NODE_ENV = process.env.NODE_ENV || "";

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

export const objectToHash = compose(
  md5,
  join(""),
  flatten,
  toPairs
);
