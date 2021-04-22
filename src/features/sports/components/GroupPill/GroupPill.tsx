import { gql } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { Pill } from "Components/Pill";

type Props = {
  /** Optional onClick handler that is passed to the underlying Pill component */
  onClick?: () => void;
  /** Optional onRemove handler that is passed to the underlying Pill component */
  onRemove?: () => void;
  /** Optional isActive flag that is passed to the underlying Pill component */
  isActive?: boolean;
  /** The group object to be displayed, type is generated from GroupPill.fragments.group */
  group: A.GroupPill_GroupFragment;
};

const GroupPill = ({ onClick, onRemove, group, isActive = false }: Props) => (
  // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
  <Pill
    onClick={onClick}
    onRemove={onRemove}
    isActive={isActive}
    activeClassNames="bg-grey-50 text-white"
    inactiveClassNames="bg-grey-0 text-grey-50"
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
