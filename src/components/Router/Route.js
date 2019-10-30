// @flow
import * as React from "react";
import invariant from "invariant";
import { ErrorBoundary } from "Components/ErrorBoundary";

type Props = {
  children: React.Element<any>,
  path: string | string[],
};

export class Route extends React.PureComponent<Props> {
  componentDidMount() {
    const { path, children } = this.props;

    invariant(path, "A <Route> should have a path prop value");

    invariant(
      children == null || React.Children.count(children) === 1,
      "A <Route> should have only one child element"
    );
  }

  render() {
    return (
      <ErrorBoundary withoutUserFeedback>{this.props.children}</ErrorBoundary>
    );
  }
}
