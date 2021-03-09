import { isNil } from "ramda";
export type Replacements = { [key: string]: any };

const REPLACEMENT_REGEX = /\{([\S]+)\}/g;

export const compile = (
  term: string,
  replacements: Replacements = {}
): string =>
  term.replace(REPLACEMENT_REGEX, (_, replacementName) =>
    isNil(replacements[replacementName])
      ? `{${replacementName}}`
      : replacements[replacementName]
  );

export const LOADING_STRING = "Loading...";

export const NOT_FOUND_STRING = "";
