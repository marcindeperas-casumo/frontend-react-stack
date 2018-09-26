import { prop } from "ramda";

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
        obj[ev] = [];
      }

      obj[ev].push(cb);
    },
    emit: (ev, data) => {
      console.log("🌈 Emitting event", { ev, data });

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    },
  };
};

export const cacheLocallyForMs = ms => {
  let lastValue = {
    lastUpdated: 0,
  };
  console.log(`🏝 Setting up local cache for ${ms}ms`);

  return performCall => (...args) => {
    const now = new Date().getTime();
    console.log(`🏝 Last updated: ${lastValue.lastUpdated}, now: ${now}`);
    if (now - lastValue.lastUpdated <= ms) {
      console.log(
        `🏝 Still ${ms -
          (now - lastValue.lastUpdated)}ms before the cache expires.`,
        lastValue
      );
      return lastValue.success
        ? Promise.resolve(lastValue.value)
        : Promise.reject(lastValue.error);
    }

    console.log(`🏝 Returning a promise to perform work`);
    return new Promise((resolve, reject) => {
      console.log(`🏝 Performing work`);
      try {
        const result = performCall(...args);
        resolve(result);
      } catch (e) {
        console.log("CACHE ERROR", e);
        reject(e);
      }
    })
      .then(value => {
        lastValue = {
          success: true,
          value,
          lastUpdated: new Date().getTime(),
        };
        console.log(`🏝 Work performed updating internal values`, {
          lastValue,
        });

        return value;
      })
      .catch(e => {
        console.error("performCall Error", e);
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
  console.log(x);
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
    obj[item[key]] = item;
    return obj;
  }, {});
};

export const SimpleCache = () => {
  let internalValue = null;
  let valueSet = false;

  const isEmpty = () => {
    return !valueSet;
  };

  const set = newValue => {
    internalValue = newValue;
    valueSet = true;
    return;
  };

  const get = () => {
    return internalValue;
  };

  const invalidate = () => {
    internalValue = null;
    valueSet = false;
  };

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

  if (searchIdx !== 0) {
    matchers.push(unmatched(str.substr(0, searchIdx)));
  }

  matchers.push(matched(str.substr(searchIdx, searchTerm.length)));

  if (searchIdx + searchTerm.length < str.length) {
    matchers.push(
      unmatched(str.substr(searchIdx + searchTerm.length, str.length - 1))
    );
  }

  return matchers;
};

export const fromCommonHandshake = k => prop(`common/composition/${k}`);
