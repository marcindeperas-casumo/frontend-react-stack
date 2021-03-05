import { gql } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import React from "react";
import * as A from "Types/apollo";
import { makeOptionalCallback } from "Utils";
import GroupPill from "Features/sports/components/GroupPill";
import EditPillsButton from "Features/sports/components/EditPillsButton";

type CompetitionPillsListProps = {
  competitions: Array<A.CompetitionPillsList_GroupFragment>;
  onRemove?: (x: A.CompetitionPillsList_GroupFragment) => any;
  onAdd?: () => any;
  onClick?: (x: A.CompetitionPillsList_GroupFragment) => any;
  isActive?: (x: A.CompetitionPillsList_GroupFragment) => boolean;
};

const CompetitionPillsList = (props: CompetitionPillsListProps) => (
  <Flex gap="none" className="o-flex--wrap">
    {props.competitions.map(competition => {
      const onClick = makeOptionalCallback((props as any).onClick, competition);
      const onRemove = makeOptionalCallback(props.onRemove, competition);
      return (
        <Flex.Item
          key={competition.id}
          className="u-margin-y--sm u-margin-left--none u-margin-right--sm"
        >
          <GroupPill
            onClick={onClick}
            onRemove={onRemove}
            isActive={
              (props as any).isActive
                ? (props as any).isActive(competition)
                : competition.userFavourite
            }
            group={competition}
          />
        </Flex.Item>
      );
    })}
    {(props as any).onAdd && (
      <Flex.Item className="u-margin--sm">
        <EditPillsButton onClick={(props as any).onAdd} />
      </Flex.Item>
    )}
  </Flex>
);
CompetitionPillsList.fragments = {
  group: gql`
    fragment CompetitionPillsList_Group on EventGroup {
      id
      userFavourite
      ...GroupPill_Group
    }
    ${GroupPill.fragments.group}
  `,
};
export default CompetitionPillsList;
