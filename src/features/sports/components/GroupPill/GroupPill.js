// @flow

import React from "react";
import gql from "graphql-tag";
import { Pill } from "Components/Pill";

type Props = {
  onClick?: () => void,
  onRemove?: () => void,
  isActive?: boolean,
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
