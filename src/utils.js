import isPromise from "is-promise";
import React from "react";
import Loadable from "react-loadable";
import { isNullOrUndefined, isUndefined } from "util";

export const toMobileNumber = phoneNumber =>
  `${phoneNumber.prefix} ${phoneNumber.number}`;

export const toAddress = address => [
  address.addressLines.street,
  address.addressLines.city,
  address.addressLines.zip,
  address.country
];

export const toPlayerSettingsData = data => {
  if (!data) {
    return {};
  }
  return {
    fullName: `${data.contactInfo.name.firstName} ${
      data.contactInfo.name.lastName
    }`,
    email: data.contactInfo.email,
    mobileNumber: toMobileNumber(data.contactInfo.phoneNumber),
    address: toAddress(data.contactInfo.primaryAddress),
    offersByEmail: true
  };
};

export const toPlayerConfigurationData = ({ configuration = {} } = {}) =>
  configuration;

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
    }
  };
};

export const cacheLocallyForMs = ms => {
  let lastValue = {
    lastUpdated: 0
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
          lastUpdated: new Date().getTime()
        };
        console.log(`🏝 Work performed updating internal values`, {
          lastValue
        });

        return value;
      })
      .catch(e => {
        console.error("performCall Error", e);
        lastValue = {
          success: false,
          error: e,
          lastUpdated: new Date().getTime()
        };

        return Promise.reject(e);
      });
  };
};

const commonFetch = (url, options) => {
  return fetch("/api-gw/api/" + url, {
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    ...options
  }).then(x => x.json());
};

export const usingPOST = (url, options) =>
  commonFetch(url, {
    method: "POST",
    ...options
  });

export const usingGET = commonFetch;

export const mockWith = mockFn => actualFn => (...args) => mockFn(...args);

export const once = fn => {
  let run = false;
  let lastValue;
  return (...args) => {
    if (!run) {
      run = true;
      lastValue = fn(...args);
    } else {
    }
    return lastValue;
  };
};

export const compose2 = (f, g) => (...args) => f(g(...args));
export const property = k => obj => obj && obj[k];

export const notUndefined = x =>
  isUndefined(x) ? Promise.reject(new TypeError("Expected promise")) : x;

export const rejectIfNotPromise = fn => a =>
  isPromise(a) ? fn(a) : Promise.reject(new TypeError("Expected promise"));

export const trace = x => {
  console.log(x);
  return x;
};

export const filter = (arr, predicate) => arr.filter(predicate);
export const not = x => !x;

export const getBodyTag = () => window.document.getElementsByTagName("body")[0];
export const getHostElement = id => {
  const el = window.document.getElementById(id);
  if (!el) {
    console.warn(
      `Trying to find element with id #${id} but it was not found. Going to fallback on the body tag instead.`
    );
    return getBodyTag();
  }

  return el;
};

const Loading = props => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

export const defaultComponentLoader = ({
  loader,
  loading = props => <Loading {...props} />
}) =>
  Loadable({
    loader,
    loading
  });

export const compose = (...fns) => iv =>
  fns.reduceRight((acc, curr) => curr(acc), iv);

export const composePromises = (...fns) => iv =>
  fns.reduceRight(async (acc, curr) => curr(await acc), iv);

export const applyOnPromise = pf => px =>
  (isPromise(pf) ? pf : Promise.resolve(pf)).then(f => px.then(x => f(x)));
export const identity = id => id;

export const throwIf = (predicate, e) => x => {
  if (predicate(x)) {
    throw e;
  }
  return x;
};

export const tryCatch = (fn, throwError) => async (...args) => {
  try {
    return await fn(...args);
  } catch (e) {
    throw new Error(throwError.message);
  }
};

export const defaultValue = (v, defaultValue) => {
  if (isUndefined(v)) {
    return defaultValue;
  }

  return v;
};

export const overAll = arr => fns =>
  fns.reduce((acc, curr, i) => {
    acc.push(curr(arr[i]));
    return acc;
  }, []);

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
    invalidate
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
        ...options
      });
    }
  };
};

export const isNotNullOrUndefined = compose(
  not,
  isNullOrUndefined
);

export const decodeString = s =>
  new DOMParser().parseFromString(
    `<!doctype html><body>${s}</body></html>`,
    "text/html"
  ).body.textContent;
