// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import * as A from "Types/apollo";
import { CURRENCY_SYMBOLS } from "Src/constants";

export const noop = () => {};

export const isNilOrEmpty = R.either(R.isNil, R.isEmpty);

export const isTestEnv = () => R.includes("casumotest", window.location.origin);

export const bridgeFactory = () => {
  const obj = {};
  return {
    on: (ev: string, cb: any => void) => {
      if (!obj[ev]) {
        // eslint-disable-next-line fp/no-mutation
        obj[ev] = [];
      }

      // eslint-disable-next-line fp/no-mutating-methods
      obj[ev].push(cb);
    },
    off: (ev: string, cb: any => void) => {
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
    emit: (ev: string, data: any) => {
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
  predicate: (*) => boolean,
  items: any[]
) => R.find(predicate, items) || defaultValue;

export const findOr = R.curry(findOrUncurried);

export const composePromises = (...fns: Array<*>) => (iv: Promise<*>) =>
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
export const renderBets = (bet: ?A.GameRow_Game_lobby_bets) =>
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

export const injectScript = (url: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    /* eslint-disable fp/no-mutation */
    script.onload = () => resolve();
    script.onerror = () => reject(`Script url, failed to load`);

    script.src = url;
    /* eslint-enable fp/no-mutation */
    if (document.head) {
      document.head.appendChild(script);
    }
  });

export const commaSeparated = R.compose(
  R.join(","),
  R.filter(R.identity)
);
type Handlers<S> = {
  [type: string]: (state: S, action: Object) => S,
};

// This can be used as suggested in the Redux docs:
// https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
export function createReducer<S>(
  initialState: S,
  handlers: Handlers<S>
): (state: S, action: any) => S {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
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
}: {
  locale: string,
  currency: string,
  value: ?number,
}): string {
  /**
   * Hack? if modulo 1 returns something other than 0 we have fractions and
   * we want them rendered nicely (ie. 4.2 should be rendered as €4.20), in
   * other case we want to render number without them (ie. 50 should be €50
   * rather than €50.00). I'm pretty sure that latter should never happened
   * https://github.com/search?q=This+should+never+happen&type=Code&utf8=✓
   */
  const minimumFractionDigits = (value || 0) % 1 === 0 ? 0 : 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  }).format(value || 0);
}

export function getSymbolForCurrency({
  locale,
  currency,
}: {
  locale: string,
  currency: string,
}): string {
  /**
   * Safari doesn't contain formatToParts on Intl.NumberFormat object.
   * My idea here was to format any number and the replace all
   * numbers and separators so we get only symbol.
   *
   * fun fact - sometimes formatted currencies use " " instead of space.
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
  replacements: { [string]: string | number }
) =>
  target
    .replace(INTERPOLATION_REGEX, (match, param) =>
      R.propOr(match, param, replacements)
    )
    .replace(CURRENCY_INTERPOLATION_REGEX, (match, param) =>
      R.propOr(match, param, replacements)
    );

export const interpolateWithJSX = R.curry(
  (replacements: { [string]: React.Node }, target: string) =>
    R.pipe(
      R.split(/({{2,3}\s*\w+\s*}{2,3})/gm),
      R.addIndex(R.map)((x, i) => (
        <React.Fragment key={i}>
          {R.pipe(
            R.match(/{{2,3}\s*(\w+)\s*}{2,3}/),
            R.prop(1),
            R.propOr(x, R.__, replacements)
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

export const convertHoursToDays = (hours: number) => {
  return Math.floor(hours / 24);
};

type InterpolateTimeIntervalType = {
  seconds: number,
  t: {
    seconds: string,
    minutes?: string,
    hours?: string,
    days?: string,
  },
};

export const interpolateTimeInterval = ({
  seconds,
  t,
}: InterpolateTimeIntervalType) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (t.days && days >= 1) {
    return interpolate(t.days, { days });
  }
  if (t.hours && hours >= 1) {
    return interpolate(t.hours, { hours });
  }
  if (t.minutes && minutes >= 1) {
    return interpolate(t.minutes, { minutes });
  }

  return interpolate(t.seconds, { seconds });
};

export const convertTimestampToLuxonDate = (value: number) => {
  return DateTime.fromSeconds(value);
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
  return DateTime.fromMillis(time)
    .diffNow()
    .valueOf();
};

export const isTLDMarketSpecific: string => boolean = R.pipe(
  R.anyPass([
    R.equals("com"),
    R.equals("dev"),
    R.equals("tech"),
    R.equals("localhost"),
  ]),
  R.not
);
