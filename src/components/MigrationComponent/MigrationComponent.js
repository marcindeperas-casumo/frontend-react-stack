import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import invariant from "invariant";

class MigrationComponent extends PureComponent {
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
    const { children } = this.props;
    return children;
  }
}

MigrationComponent.propTypes = {
  migrationKey: PropTypes.string.isRequired,
};

export default MigrationComponent;
