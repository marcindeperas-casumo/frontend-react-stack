//@flow
import {
  either,
  isEmpty,
  isNil,
  splitEvery,
  join,
  compose,
  filter,
  identity,
  pathOr,
} from "ramda";
// @flow
import type { Bets } from "Types/liveCasinoLobby";

export const isNilOrEmpty = either(isNil, isEmpty);

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
    emit: (ev: string, data: any) => {
      console.log("🌈 Emitting event", { ev, data }); // eslint-disable-line no-console

      if (obj[ev]) {
        obj[ev].forEach(listener => {
          listener(data);
        });
      }
    },
  };
};

export const composePromises = (...fns: Array<*>) => (iv: Promise<*>) =>
  fns.reduceRight(async (acc, curr) => curr(await acc), iv);

export const decodeString = (s: string) =>
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
  return splitEvery(numberByColumns, items);
}

// TODO: make this a component
// TODO2: decide which type is correct, see: Casumo/Home#27723
export const renderBets = (bet: ?(Bets | GameRow_Game_lobby_bets)) => {
  if (!bet) {
    return "";
  }

  return `${bet.symbol || ""}${bet.min || 0} - ${bet.symbol || ""}${bet.max ||
    0}`;
};

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

export const commaSeparated = compose(
  join(","),
  filter(identity)
);
type Handlers = {
  [type: string]: (state: Object, action: Object) => any,
};

// This can be used as suggested in the Redux docs:
// https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
export const createReducer = (initialState: Object, handlers: Handlers) => {
  return function reducer(state: Object = initialState, action: Object) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export function formatCurrency({
  locale,
  currency,
  value,
}: {
  locale: string,
  currency: string,
  value: number,
}): string {
  /**
   * Hack? if modulo 1 returns something other than 0 we have fractions and
   * we want them rendered nicely (ie. 4.2 should be rendered as €4.20), in
   * other case we want to render number without them (ie. 50 should be €50
   * rather than €50.00). I'm pretty sure that latter should never happened
   * https://github.com/search?q=This+should+never+happen&type=Code&utf8=✓
   */
  const minimumFractionDigits = value % 1 === 0 ? 0 : 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  }).format(value);
}

const INTERPOLATION_REGEX = /{{2,3}\s*(\S+)\s*}{2,3}/gm;

export const interpolate = (data: string, replacements: any) => {
  return data.replace(INTERPOLATION_REGEX, (match, param) =>
    pathOr(match, [param], replacements)
  );
};
