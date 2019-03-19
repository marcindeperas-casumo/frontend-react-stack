// @flow
import { assocPath, either, isEmpty, isNil, splitEvery } from "ramda";
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

export const sanitizeObject = (
  obj: Object,
  keysToSanitize: Array<string> = []
) => {
  return keysToSanitize
    .map(key => key.split("."))
    .reduce((acc, key) => assocPath(key, "******", acc), obj);
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
