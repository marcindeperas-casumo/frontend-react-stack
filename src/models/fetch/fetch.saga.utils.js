// @flow
import { types as fetchTypes } from "./fetch.constants";

type Action = {
  type: string,
  name: string,
};

/**
 * A fetch take pattern predicate creator.
 * Pass in a concrete action name and get a predicate that matches
 * on failed request and that action name.
 */
export function isFailedFetchTakePatternCreator(
  actionName: string
): (action: Action) => boolean {
  return action =>
    action.type === fetchTypes.REQUEST_ERROR && action.name === actionName;
}
