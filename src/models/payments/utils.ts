type TPiqError = {
  key: string | undefined;
  keys: Array<string>;
};

type TPiqErrorResponse = {
  errors: Array<TPiqError>;
};

export const extractErrorKeys = (
  piqErrorResponse: TPiqErrorResponse
): Array<string> => {
  return piqErrorResponse.errors.reduce((keys, error) => {
    return keys.concat(error.key || [], error.keys);
  }, []);
};
