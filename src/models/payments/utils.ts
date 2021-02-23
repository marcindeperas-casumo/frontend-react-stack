// @flow
type TPiqError = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  key: ?string,
  keys: Array<string>,
};

type TPiqErrorResponse = {
  errors: Array<TPiqError>,
};

export const extractErrorKeys = (
  piqErrorResponse: TPiqErrorResponse
): Array<string> => {
  return piqErrorResponse.errors.reduce((keys, error) => {
    return keys.concat(error.key || [], error.keys);
  }, []);
};
