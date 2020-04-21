/**
 * Copied from: https://github.com/airbnb/enzyme/issues/2073#issuecomment-531488981
 * You can investigate if it still is needed :)
 */

// @flow
import gql from "graphql-tag";
import { act } from "react-dom/test-utils";
import { ReactWrapper } from "enzyme";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "Models/apollo/introspections.json";
import { generateQueries } from "Utils/hooks/useTranslationsGql";

// https://github.com/wesbos/waait/blob/master/index.js
export function wait(amount: number = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, amount));
}

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount: number = 0) {
  await act(async () => {
    await wait(amount);
  });
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function waitAndUpdateWrapper(
  wrapper: ReactWrapper<any>,
  amount: number = 0
) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}

export function getCacheWithIntrospections() {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  return new InMemoryCache({ fragmentMatcher });
}

export function generateTranslationsQuery(translationKeyIdMap: {
  [string]: string,
}) {
  return gql`
    query TranslationsQuery {
      ${generateQueries(translationKeyIdMap)}
    }
  `;
}

export function generateTranslationsQueryMock(
  query: any,
  translationKeyIdMap: { [string]: string },
  translationKeyValueMap: { [string]: string }
) {
  return {
    request: {
      query,
    },
    result: {
      data: Object.entries(translationKeyIdMap).reduce((accu, [key, id]) => {
        return {
          ...accu,
          [key]: {
            __typename: "CmsText",
            id,
            text: translationKeyValueMap[key],
          },
        };
      }, {}),
    },
  };
}
