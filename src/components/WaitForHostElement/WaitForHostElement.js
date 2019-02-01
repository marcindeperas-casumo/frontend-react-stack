// @flow
import React, { type ElementProps } from "react";
// Using `wait-by-timer` implementation because of the following issue:
//
// *Change WaitForElement to use timer wait implementation* -
// (https://github.com/Casumo/Home/issues/23708)
import waitForElement from "wait-for-element/lib/wait-by-timer";

type Props = {
  hostElementId: string,
} & ElementProps<any>;
type State = {
  error: ?Error,
  el: ?HTMLElement,
};
// We need this component so we can wait for the host element to be available.
// This could happen when the route is active, but the view is not bound yet.
export class WaitForHostElement extends React.PureComponent<Props, State> {
  static waitTimeout = 30000;
  state = { el: null, error: null };

  async componentDidMount() {
    const { hostElementId } = this.props;
    try {
      const el = await waitForElement(
        `#${hostElementId}`,
        WaitForHostElement.waitTimeout
      );

      this.setState({ el });
    } catch (e) {
      console.error(e.message);
      this.setState({ el: null, error: e });
    }
  }

  render() {
    const { el } = this.state;
    const { children } = this.props;

    if (el) return children;

    return null;
  }
}

export default WaitForHostElement;
