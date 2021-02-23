// @flow
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import type { Node } from "react";

const DefaultFallback = () => null;

export type Props = {
  /** The id of the DOM element to render into */
  hostElementId: string,
  /** The children to render */
  children: Node,
  /** If true the DOM element will be cleared before rendering into it */
  clearElement?: boolean,
  /** The fallback component, e.g. <Foo />. Defaults to null. */
  fallback?: Node,
  /** Whether to render the fallback component or not */
  showFallback?: boolean,
};

export default class Portal extends PureComponent<Props> {
  rootEl: HTMLElement | null;
  el: HTMLElement;

  constructor(props: Props) {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    super((props: Props));

    this.rootEl = document.getElementById(this.props.hostElementId);
    this.el = document.createElement("div");
    this.clearElementIfNeeded();
  }

  clearElementIfNeeded() {
    const { clearElement = true } = this.props;

    if (!clearElement || !this.rootEl) {
      return;
    }

    // If we ever encounter performance issues with this line, we can always
    // rewrite it as:
    //
    // while (this.rootEl.lastChild)
    //   {this.rootEl.removeChild(this.rootEl.lastChild);
    // }
    //
    // Source:
    // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    //
    // As it seems that this is way faster than `innerHTML = ""` but this is
    // also a micro optimization and we don't really have a case yet that we
    // have to remove the child nodes that frequently that is causing
    // performance issues.
    this.rootEl.innerHTML = "";
  }

  componentDidMount() {
    if (!this.rootEl) {
      return;
    }

    this.rootEl.appendChild(this.el);
  }

  componentWillUnmount() {
    if (!this.rootEl) {
      return;
    }

    this.rootEl.removeChild(this.el);
  }

  render() {
    const {
      children,
      fallback = <DefaultFallback />,
      showFallback = false,
    } = this.props;
    const shouldShowFallback = showFallback && fallback;
    const Component = shouldShowFallback ? fallback : children;

    return ReactDOM.createPortal(Component, this.el);
  }
}
