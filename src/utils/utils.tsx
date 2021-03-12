import * as React from "react";
import * as R from "ramda";
import { DateTime, Duration } from "luxon";
import * as A from "Types/apollo";
import {
  DEVICES,
  CURRENCY_SYMBOLS,
  EMBEDDED_GAMES,
  APP_SUB_TYPES,
} from "Src/constants";
import type { AppDevice } from "Src/types";

export const noop = () => {};

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

export const isIosNative = (w = window) =>
  R.pathOr(false, ["native", "ios"], w);

export const isAndroidNative = (w = window) =>
  R.pathOr(false, ["native", "android"], w);

export const getAppVersion = (w = window) => {
  const appVersion = R.pathOr(undefined, ["native", "version"], w);

  if (isIosNative() && appVersion) {
    return `ios/{${appVersion}}`;
  }

  return undefined;
};

// todo: @chris.ciantar confirm if this is required anymore or not - GTM specific event field
export const getAppSubType = (w = window) => {
  if (isIosNative) {
    return APP_SUB_TYPES.IOS_HYBRID;
  }

  if (isAndroidNative) {
    return APP_SUB_TYPES.ANDROID_HYBRID;
  }

  if (window.matchMedia("(display-mode: standalone)").matches) {
    return APP_SUB_TYPES.ANDROID;
  }

  return APP_SUB_TYPES.WEB;
};

export const isEmbeddedOn = (userEmail: string) => {
  if (!isIosNative()) {
    return false;
  }

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
  if (EMBEDDED_GAMES.TESTERS.includes(userEmail)) {
    return true;
  }

  return EMBEDDED_GAMES.ACTIVE;
};

export const decodedUrlParams = (json: Object) =>
  R.mergeAll(Object.keys(json).map(key => ({ [key]: atob(json[key]) })));

export const isTestEnv = () => R.includes("casumotest", window.location.origin);

export const getPlatform = (): AppDevice => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;

  const isMobile =
    /\b(?:BlackBerry|webOS|iPhone|IEMobile)\b/iu.test(userAgent) ||
    /\b(?:Android|Windows Phone|iPad|iPod)\b/iu.test(userAgent);

  return isMobile ? DEVICES.MOBILE : DEVICES.DESKTOP;
};

export const isMobileByPlatform = () => getPlatform() === DEVICES.MOBILE;

export const bridgeFactory = () => {
  const obj = {};
  return {
    on: (ev: string, cb: (data: any) => void) => {
      if (!obj[ev]) {
        // eslint-disable-next-line fp/no-mutation
        obj[ev] = [];
      }

      // eslint-disable-next-line fp/no-mutating-methods
      obj[ev].push(cb);
    },
    off: (ev: string, cb: (data: any) => void) => {
      if (obj[ev]) {
        const index = R.findIndex(fn => fn === cb)(obj[ev]);
        if (index !== -1) {
          // eslint-disable-next-line fp/no-mutating-methods
          obj[ev].splice(index, 1);
        } else if (__DEV__) {
          console.error(`trying to unsubscribe non-existing callback on ${ev}`);
        }
      }
    },
    emit: (ev: string, data?: any) => {
      if (__DEV__) {
        console.log("🌈 Emitting event", { ev, data }); // eslint-disable-line no-console
      }

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    },
  };
};

const findOrUncurried = (
  defaultValue: any,
  predicate: (a: any) => boolean,
  items: any[]
) => R.find(predicate, items) || defaultValue;

export const findOr = R.curry(findOrUncurried);

export const composePromises = (...fns: Array<any>) => (iv: Promise<any>) =>
  fns.reduceRight(async (acc, curr) => curr(await acc), iv);

export const convertHTMLToString = (s: string) =>
  new DOMParser().parseFromString(`<div>${s}</div>`, "text/html").childNodes[0]
    .textContent;

/**
 * Use this method when you want to know which parts of the string are the
 * "matched" and "unmatched" groups for a given search term.
 * @param {string} str String to search into
 * @param {string} searchTerm Search term to search into a given string
 */
export const matchingGroups = (str: string, searchTerm: string) => {
  const matchType = (type, value) => ({
    type,
    value,
  });

  const unmatched = value => matchType("unmatched", value);
  const matched = value => matchType("matched", value);

  const normalizedStr = str.toLowerCase();
  const normalizedTarget = searchTerm.toLowerCase();

  const searchIdx = normalizedStr.indexOf(normalizedTarget);
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

export const makeProtocolAwareUrl = (url: string) => {
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

export const addPointerEventStylesToLinkElements = (s: string) => {
  // allow links be clickable in <Cards... components,
  // through the link layer
  const extraStyle = `
    pointer-events: all;
  `;

  return s && s.replace(/(<a.*)(>)(.*<\/a>)/g, `$1 style="${extraStyle}"$2$3`);
};

export const stringToHTML = (s: string) => {
  return { __html: s };
};

export function generateColumns<T>(
  items: Array<T>,
  numberByColumns: number = 3
): Array<Array<T>> {
  return R.splitEvery(numberByColumns, items);
}

// TODO: make this a component
export const renderBets = (
  bet: A.GameRow_GameFragment["lobby"]["bets"] | null
) =>
  R.cond([
    [R.isNil, R.always(null)],
    [
      R.pathEq(["symbol"], CURRENCY_SYMBOLS.SEK) ||
        R.pathEq(["symbol"], CURRENCY_SYMBOLS.DKK),
      o =>
        `${R.path(["min"])(o)} ${R.path(["symbol"])(o)} - ` +
        `${R.path(["max"])(o)} ${R.path(["symbol"])(o)}`,
    ],
    [
      R.T,
      o =>
        `${R.path(["symbol"])(o)}${R.path(["min"])(o)} - ` +
        `${R.path(["symbol"])(o)}${R.path(["max"])(o)}`,
    ],
  ])(bet);

export const injectScript = (src: string, elId?: string, inline?: boolean) =>
  new Promise<void>((resolve, reject) => {
    // eslint-disable-next-line fp/no-let
    let injectedScript;

    const script = document.createElement("script");
    /* eslint-disable fp/no-mutation */
    script.onload = () => resolve();
    script.onerror = () => reject(`Script url, failed to load`);

    if (elId) {
      script.id = elId;
    }

    if (inline) {
      script.innerHTML = src;
    } else {
      script.src = src;
    }

    if (document.head) {
      injectedScript = document.head.appendChild(script);
    }
    /* eslint-enable fp/no-mutation */

    if (inline && injectedScript) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      script.onload();
    }
  });

export const commaSeparated = R.compose(R.join(","), R.filter(R.identity));
type Handlers<S> = {
  [type: string]: (state: S, action: Object) => S;
};

// This can be used as suggested in the Redux docs:
// https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
export function createReducer<S>(
  initialState: S,
  handlers: Handlers<S>
): (state: S, action: any) => S {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function formatCurrency({
  locale,
  currency,
  value,
  minimumFractionDigits,
}: {
  locale: string;
  currency: string;
  value: number | undefined;
  minimumFractionDigits?: number;
}): string {
  /**
   * Hack? if modulo 1 returns something other than 0 we have fractions and
   * we want them rendered nicely (ie. 4.2 should be rendered as €4.20), in
   * other case we want to render number without them (ie. 50 should be €50
   * rather than €50.00). I'm pretty sure that latter should never happened
   * https://github.com/search?q=This+should+never+happen&type=Code&utf8=✓
   */
  const fractionDigitsFallback = (value || 0) % 1 === 0 ? 0 : 2;
  const fractionDigits = minimumFractionDigits || fractionDigitsFallback;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
  }).format(value || 0);
}

export function getSymbolForCurrency({
  locale,
  currency,
}: {
  locale: string;
  currency: string;
}): string {
  /**
   * Safari doesn't contain formatToParts on Intl.NumberFormat object.
   * My idea here was to format any number and the replace all
   * numbers and separators so we get only symbol.
   */
  return formatCurrency({
    locale,
    currency,
    value: 0,
  }).replace(/\d|\s|\.|,/g, "");
}

const INTERPOLATION_REGEX = /{{2,3}\s*(\w+)\s*}{2,3}/gm;
const CURRENCY_INTERPOLATION_REGEX = /{{2}\s*(\w+)\s* \|\s*€\s*}{2}/gm;

const defaultTranslation = "[MISSING TRANSLATION]";

export const canBeInterpolated = (target: string) =>
  target.match(INTERPOLATION_REGEX) !== null;

export const interpolate = (
  target: string = defaultTranslation,
  replacements: { [s: string]: string | number }
) =>
  target
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    .replace(INTERPOLATION_REGEX, (match, param) =>
      R.propOr(match, param, replacements)
    )
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    .replace(CURRENCY_INTERPOLATION_REGEX, (match, param) =>
      R.propOr(match, param, replacements)
    );

export const interpolateWithJSX = R.curry(
  (replacements: { [s: string]: React.ReactNode }, target: string) =>
    R.pipe(
      R.split(/({{2,3}\s*\w+\s*}{2,3})/gm),
      R.addIndex(R.map)((x, i) => (
        <React.Fragment key={i}>
          {R.pipe(
            R.match(/{{2,3}\s*(\w+)\s*}{2,3}/),
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            R.prop(1),
            R.propOr(x, R.__, replacements)
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
          )(x)}
        </React.Fragment>
      ))
    )(target || defaultTranslation)
);

export const getCssCustomProperty = (property: string) =>
  document.documentElement
    ? document.documentElement.style.getPropertyValue(property)
    : undefined;

// handle CMS workaround using "empty" to prevent locale fallback returning wrong string
export const isCmsEntryEmpty = R.pipe(
  R.when(isNilOrEmpty, R.always("")),
  R.replace(/^empty$/i, ""),
  R.equals("")
);

export const convertHoursToDaysRoundUp = (hours: number) => {
  if (hours < 24) {
    return 0;
  }

  return Math.ceil(hours / 24);
};

type InterpolateTimeIntervalType = {
  seconds: number;
  t: {
    seconds: string;
    minutes?: string;
    hours?: string;
    days?: string;
  };
};

export const interpolateTimeInterval = ({
  seconds,
  t,
}: InterpolateTimeIntervalType) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (t.days && days >= 1) {
    return interpolate(t.days, { days, value: days });
  }
  if (t.hours && hours >= 1) {
    return interpolate(t.hours, { hours, value: hours });
  }
  if (t.minutes && minutes >= 1) {
    return interpolate(t.minutes, { minutes, value: minutes });
  }

  return interpolate(t.seconds, { seconds, value: seconds });
};

export const convertTimestampToLuxonDate = (value: number) => {
  return DateTime.fromSeconds(value);
};

export const convertLuxonDurationObjectToSeconds = (
  duration: Object
): number => {
  return Number.parseInt(Duration.fromObject(duration).toFormat("s"));
};

export const getDateTimeDifferenceFromNow = (value: DateTime) => {
  const duration = value.diff(DateTime.utc(), ["hours", "minutes", "seconds"]);

  return R.pick(["hours", "minutes", "seconds"], duration);
};

/**
 * @link https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
 */
export const formatTime = (millis: number): string => {
  return DateTime.fromMillis(millis).toFormat("TT");
};

export const timeRemainingBeforeStart = (time: number): number => {
  return DateTime.fromMillis(time).diffNow().valueOf();
};

export const isTLDMarketSpecific: (s: string) => boolean = R.pipe(
  R.anyPass([
    R.equals("com"),
    R.equals("dev"),
    R.equals("tech"),
    R.equals("localhost"),
  ]),
  R.not
);

export const hasAlphaCharactersOnly = (str: string): boolean => {
  return !/[a-z]+/i.test(str);
};

// Displays bonus balance with matching currency symbol to passed locale and followed by bonus string passed as argument
export const bonusBalanceDisplay = (
  value: number | undefined,
  currency: string,
  bonusText: string,
  locale: string,
  trimmed?: boolean
) => {
  if (!value) {
    return "";
  }
  return `+${formatCurrency({ locale, currency, value })} ${
    !trimmed ? bonusText : ""
  }`;
};

// Returns ordinal suffix for received number eg for 1 it returns 'st', for 52 returns 'nd' ..
const ordinalTranslations = {
  en: {
    ordinal: new Map([
      ["0", "th"],
      ["1", "st"],
      ["2", "nd"],
      ["3", "rd"],
      ["4", "th"],
      ["5", "th"],
      ["6", "th"],
      ["7", "th"],
      ["8", "th"],
      ["9", "th"],
    ]),
  },
  se: {
    ordinal: new Map([
      ["0", "e"],
      ["1", "a"],
      ["2", "a"],
      ["3", "e"],
      ["4", "e"],
      ["5", "e"],
      ["6", "e"],
      ["7", "e"],
      ["8", "e"],
      ["9", "e"],
    ]),
  },
};

/**
 * Returns ordinal suffix for received number eg for (en-gb) 1 it returns 'st', for 52 returns 'nd' ...
 *
 * @param {String} locale
 * @param {Number} amount
 * @returns {String}
 */
export const getOrdinalSuffix = ({
  locale = "en",
  amount,
}: {
  locale: string;
  amount: number;
}) => {
  if (!locale || !amount) {
    return "";
  }

  // Get the ordinal by locale and amount that applies - certain locales use same ordinal for all values
  const lastDigitInAmount = amount.toString().substr(-1);
  if (locale === "dk" || locale === "no") {
    return ".";
  } else if (locale === "es") {
    return "%C2%BA";
  } else if (locale === "jp") {
    return "%E4%BD%8D";
  }
  const marketOrdinalTranslations = ordinalTranslations[locale];
  return (
    (marketOrdinalTranslations || ordinalTranslations.en).ordinal.get(
      lastDigitInAmount
    ) || ""
  );
};
