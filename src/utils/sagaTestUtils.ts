// @flow
import * as R from "ramda";
import { runSaga } from "redux-saga";
const io = "@@redux-saga/IO";
type Effects = {
    select: Array<{
        selector: Function; // selector function
        args: Array<any>; // arguments that were passed to selector function
        result: any; // value returned from selector function
    }>;
    call: Array<{
        context: any; // null?
        fn: Function; // call function
        args: Array<any>; // arguments that were passed to call function
        result: any; // value returned from call function
    }>;
    put: Array<{
        channel: any; // null?
        action: {
            type: string;
        }; // & everything else that went into yield put
        result: any; // value returned from put function
    }>;
};
/* eslint-disable fp/no-mutating-methods, fp/no-mutation */
/**
 * This function runs through whole saga and gives back summary.
 * Useful for testing details of saga, without iterating over it by hand.
 */
export async function recordSaga({ saga, args = [], state = {}, }: {
    saga: any;
    args?: Array<any>;
    state?: {};
}): Promise<{
    /* whatever you saga returned */
    result: any;
    effects: Effects;
}> {
    const dispatched = [];
    const m = {};
    // if you need something more see: https://redux-saga.js.org/docs/api/#sagamonitor
    const returnedValue = await runSaga({
        dispatch: action => dispatched.push(action),
        getState: () => state,
        sagaMonitor: {
            effectTriggered: ({ effectId, effect }) => {
                if (!(effect as any).root) {
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    const o = R.pipe(R.omit([io]), R.keys, R.prop(0))(effect);
                    m[effectId] = {
                        effectName: o,
                        ...(effect as any).CALL,
                        ...(effect as any).PUT,
                        ...(effect as any).SELECT,
                    };
                }
            },
            effectResolved: (effectId, result) => {
                if (m[effectId]) {
                    m[effectId] = {
                        ...m[effectId],
                        result: m[effectId].effectName === "PUT" ? dispatched.shift() : result,
                    };
                }
            },
        },
    // @ts-expect-error ts-migrate(2557) FIXME: Expected at least 2 arguments, but got 2 or more.
    }, saga, ...args).done;
    // @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
    const mapEffects = R.pipe(R.values, R.reduce((acc, { effectName: e, ...res }) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toLowerCase' does not exist on type 'nev... Remove this comment to see the full error message
        const effectName = e.toLowerCase();
        return {
            ...acc,
            [effectName]: [...(acc[effectName] || []), res],
        };
    }, {}));
    return {
        result: returnedValue,
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
        effects: mapEffects(m),
    };
}
/* eslint-enable fp/no-mutating-methods, fp/no-mutation */
