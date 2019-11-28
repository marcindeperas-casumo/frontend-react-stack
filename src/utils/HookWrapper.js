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
export function HookWrapper(props: Props<*>) {
  const hook = props.hook(...props.args);

  return <div hook={hook} />;
}

/**
 * for lazy ppl, use instead of writing:
 * ----------------------------------------------------------------------------
 *   expect(wrapper.find("div").props().hook)
 * ----------------------------------------------------------------------------
 */
export function expectHook(wrapper: any) {
  return expect(wrapper.find("div").props().hook);
}
