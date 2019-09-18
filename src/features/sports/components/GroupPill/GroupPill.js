// @flow

import React from "react";
import gql from "graphql-tag";
import { RegionFlag } from "Features/sports/components/RegionFlag";
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
  <Pill
    onClick={onClick}
    onRemove={onRemove}
    isActive={isActive}
    activeClassNames="t-background-chrome-dark-1 t-color-white"
    inactiveClassNames="t-background-chrome-light-2 t-color-chrome-dark-1"
  >
    {group.regionCode && (
      <RegionFlag regionCode={group.regionCode} className="u-margin-right" />
    )}
    {group.name}
  </Pill>
);

GroupPill.fragments = {
  group: gql`
    fragment GroupPill_Group on EventGroup {
      name
      regionCode
    }
  `,
};

export default GroupPill;
