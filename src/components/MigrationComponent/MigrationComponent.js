// @flow
import React, { PureComponent } from "react";
import ErrorBoundary from "Components/ErrorBoundary";
import invariant from "invariant";

type Props = {
  children: any,
  migrationKey: string | string[],
};

class MigrationComponent extends PureComponent<Props> {
  componentDidMount() {
    const { migrationKey, children } = this.props;

    invariant(
      migrationKey,
      "A <MigrationComponent> should have a migrationKey prop value"
    );

    invariant(
      children == null || React.Children.count(children) === 1,
      "A <MigrationComponent> should have only one child element"
    );
  }

  render() {
    return (
      <ErrorBoundary withoutUserFeedback>{this.props.children}</ErrorBoundary>
    );
  }
}

export default MigrationComponent;
