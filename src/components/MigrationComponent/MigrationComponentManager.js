// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import { contains, intersection } from "ramda";

type Props = {
  activeKeys: string[],
  children: any,
};

export class MigrationComponentManager extends PureComponent<Props> {
  render() {
    return React.Children.toArray(this.props.children)
      .filter(React.isValidElement)
      .map<Node>(child => {
        const { activeKeys } = this.props;
        const {
          props: { migrationKey },
        } = child;

        if (Array.isArray(migrationKey)) {
          const intersectionKeys = intersection(migrationKey, activeKeys);
          return intersectionKeys.length > 0 ? child : null;
        }

        return contains(migrationKey, activeKeys) ? child : null;
      });
  }
}
