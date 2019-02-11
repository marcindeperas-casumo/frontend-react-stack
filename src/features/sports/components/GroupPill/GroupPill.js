// @flow

import React from "react";
import gql from "graphql-tag";
import { Pill } from "Components/Pill";

type Props = {
  /** Optional onClick handler that is passed to the underlying Pill component */
  onClick?: () => void,
  /** Optional onRemove handler that is passed to the underlying Pill component */
  onRemove?: () => void,
  /** Optional isActive flag that is passed to the underlying Pill component */
  isActive?: boolean,
  /** The group object to be displayed, type is generated from GroupPill.fragments.group */
  group: GroupPill_Group,
};

const GroupPill = ({ onClick, onRemove, group, isActive = false }: Props) => (
  <Pill onClick={onClick} onRemove={onRemove} isActive={isActive}>
    {group.flagEmoji} {group.name}
  </Pill>
);

GroupPill.fragments = {
  group: gql`
    fragment GroupPill_Group on EventGroup {
      name
      flagEmoji
    }
  `,
};

export default GroupPill;
