// @flow
import * as React from "react";

type Props<T> = {
  hook: (...T) => any,
  args: T,
};
/**
 * For testing hooks, usage:
 * ----------------------------------------------------------------------------
 *   const wrapper = shallow(<HookWrapper hook={useYourHook} args={[...]} />);
 *   const { hook } = wrapper.find('div').props();
 * ----------------------------------------------------------------------------
 * hook will contain exactly what your useYourHook returned.
 */
// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
export function HookWrapper(props: Props<*>) {
  const hook = props.hook(...props.args);

  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; hook: any; }' is not assignabl... Remove this comment to see the full error message
  return <div id="hook" hook={hook} />;
}

export function getHookValue(wrapper: any) {
  return wrapper.find("#hook").props().hook;
}

/**
 * for lazy ppl, use instead of writing:
 * ----------------------------------------------------------------------------
 *   expect(wrapper.find("div").props().hook)
 * ----------------------------------------------------------------------------
 */
export function expectHook(wrapper: any) {
  return expect(getHookValue(wrapper));
}
