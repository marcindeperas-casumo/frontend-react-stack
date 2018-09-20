import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { contains } from "ramda";

class MigrationComponentManager extends PureComponent {
  render() {
    return React.Children.toArray(this.props.children)
      .filter(React.isValidElement)
      .map(child => {
        const { activeKeys } = this.props;
        const {
          props: { migrationKey },
        } = child;

        return contains(migrationKey, activeKeys) ? child : null;
      });
  }
}

MigrationComponentManager.propTypes = {
  activeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MigrationComponentManager;
