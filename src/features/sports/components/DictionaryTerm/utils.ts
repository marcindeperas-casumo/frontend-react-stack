// @flow
import { isNil } from "ramda";
// @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
export type Replacements = { [string]: * };

const REPLACEMENT_REGEX = /\{([\S]+)\}/g;

export const compile = (
  term: string,
  // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
  replacements?: Replacements = {}
): string =>
  term.replace(REPLACEMENT_REGEX, (_, replacementName) =>
    isNil(replacements[replacementName])
      ? `{${replacementName}}`
      : replacements[replacementName]
  );

export const LOADING_STRING = "Loading...";

export const NOT_FOUND_STRING = "";
