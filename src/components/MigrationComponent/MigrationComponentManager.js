import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { contains, intersection } from "ramda";

class MigrationComponentManager extends PureComponent {
  render() {
    return React.Children.toArray(this.props.children)
      .filter(React.isValidElement)
      .map(child => {
        const { activeKeys } = this.props;
        const {
          props: { migrationKey },
        } = child;

        let isActive;

        if (Array.isArray(migrationKey)) {
          const intersectionKeys = intersection(migrationKey, activeKeys);
          isActive = intersectionKeys.length > 0;
        } else {
          isActive = contains(migrationKey, activeKeys);
        }

        return isActive ? child : null;
      });
  }
}

MigrationComponentManager.propTypes = {
  activeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MigrationComponentManager;
