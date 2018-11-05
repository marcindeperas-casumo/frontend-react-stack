// @flow
import ReactDOM from "react-dom";
import { PureComponent } from "react";
import type { Node } from "react";

export type Props = {
  /** The id of the DOM element to render into */
  elementId: string,
  /** The children to render */
  children: Node,
  /** If true the DOM element will be cleared before rendering into it */
  clearElement?: boolean,
  /** The fallback component, e.g. <Foo /> */
  fallback?: Node,
  /** Whether to render the fallback component or not */
  showFallback?: boolean,
};

export default class Portal extends PureComponent<Props> {
  rootEl: HTMLElement | null;
  el: HTMLElement;

  constructor(props: Props) {
    super((props: Props));

    this.rootEl = document.getElementById(this.props.elementId);
    this.el = document.createElement("div");
    this.clearElementIfNeeded();
  }

  clearElementIfNeeded() {
    const { clearElement = true } = this.props;

    if (!clearElement) {
      return;
    }

    if (!this.rootEl) {
      return;
    }

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
    const { children, fallback, showFallback = false } = this.props;
    const shouldShowFallback = showFallback && fallback;
    const Component = shouldShowFallback ? fallback : children;

    return ReactDOM.createPortal(Component, this.el);
  }
}
