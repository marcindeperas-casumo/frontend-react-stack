// @flow
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import type { Node } from "react";
import bridge from "Src/DurandalReactBridge";

type State = {
  currentHash: string,
};

type Props = {
  children: State => Node,
};

export const SEARCH_QUERY_UPDATED_EVENT = "search-query-updated";

export default class HashWatcher extends React.Component<Props, State> {
  state = { currentHash: window.location.hash };

  updateHashState = () => this.setState({ currentHash: window.location.hash });

  componentDidMount() {
    window.addEventListener("hashchange", this.updateHashState);

    // manual event that can be fired to notify that the search query has updated
    bridge.on(SEARCH_QUERY_UPDATED_EVENT, this.updateHashState);
  }

  render() {
    const { currentHash } = this.state;

    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    return this.props.children({ currentHash });
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.updateHashState);
  }
}
