/**
 * Copied from: https://github.com/airbnb/enzyme/issues/2073#issuecomment-531488981
 * You can investigate if it still is needed :)
 */

// @flow
import { act } from "react-dom/test-utils";
import { ReactWrapper } from "enzyme";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "Models/apollo/introspections.json";

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
export async function updateWrapper(
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
