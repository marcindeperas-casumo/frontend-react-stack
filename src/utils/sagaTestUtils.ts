// @flow
import * as R from "ramda";
import { runSaga } from "redux-saga";

const io = "@@redux-saga/IO";
type Effects = {
  select: Array<{
    selector: Function, // selector function
    args: Array<any>, // arguments that were passed to selector function
    result: any, // value returned from selector function
  }>,
  call: Array<{
    context: any, // null?
    fn: Function, // call function
    args: Array<any>, // arguments that were passed to call function
    result: any, // value returned from call function
  }>,
  put: Array<{
    channel: any, // null?
    action: { type: string }, // & everything else that went into yield put
    result: any, // value returned from put function
  }>,
};
/* eslint-disable fp/no-mutating-methods, fp/no-mutation */
/**
 * This function runs through whole saga and gives back summary.
 * Useful for testing details of saga, without iterating over it by hand.
 */
export async function recordSaga({
  saga,
  args = [],
  state = {},
}: {
  saga: any,
  args?: Array<any>,
  state?: {},
}): Promise<{
  /* whatever you saga returned */
  result: any,
  effects: Effects,
}> {
  const dispatched = [];
  const m = {};

  // if you need something more see: https://redux-saga.js.org/docs/api/#sagamonitor
  const returnedValue = await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => state,
      sagaMonitor: {
        effectTriggered: ({ effectId, effect }) => {
          if (!effect.root) {
            const o = R.pipe(
              R.omit([io]),
              R.keys,
              R.prop(0)
            )(effect);
            m[effectId] = {
              effectName: o,
              ...effect.CALL,
              ...effect.PUT,
              ...effect.SELECT,
            };
          }
        },
        effectResolved: (effectId, result) => {
          if (m[effectId]) {
            m[effectId] = {
              ...m[effectId],
              result:
                m[effectId].effectName === "PUT" ? dispatched.shift() : result,
            };
          }
        },
      },
    },
    saga,
    ...args
  ).done;

  const mapEffects = R.pipe(
    R.values,
    R.reduce((acc, { effectName: e, ...res }) => {
      const effectName = e.toLowerCase();

      return {
        ...acc,
        [effectName]: [...(acc[effectName] || []), res],
      };
    }, {})
  );

  return {
    result: returnedValue,
    effects: mapEffects(m),
  };
}
/* eslint-enable fp/no-mutating-methods, fp/no-mutation */
