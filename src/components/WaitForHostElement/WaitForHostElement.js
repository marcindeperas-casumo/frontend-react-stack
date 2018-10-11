import React, { PureComponent } from "react";
import waitForElement from "wait-for-element";

// We need this component so we can wait for the host element to be available.
// This could happen when the route is active, but the view is not bound yet.
export class WaitForHostElement extends PureComponent {
  static waitTimeout = 2000;
  state = { el: null, error: null };

  async componentDidMount() {
    const { hostElementId } = this.props;
    try {
      const el = await waitForElement(`#${hostElementId}`, this.waitTimeout);

      this.setState({ el });
    } catch (e) {
      console.error(e.message);
      this.setState({ el: null, error: e });
    }
  }

  render() {
    const { hostElementId, component: Component, ...rest } = this.props;
    return this.state.el && <Component {...rest} />;
  }
}
export default WaitForHostElement;
