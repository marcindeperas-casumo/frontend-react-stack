import * as React from "react";
import bridge from "Src/DurandalReactBridge";

type State = {
  currentHash: string;
};

type Props = {
  children: (s: State) => React.ReactNode;
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

    return this.props.children({ currentHash });
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.updateHashState);
  }
}
