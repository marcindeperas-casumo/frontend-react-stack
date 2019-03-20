// @flow

import React from "react";
import gql from "graphql-tag";
import Flex from "@casumo/cmp-flex";
import { makeOptionalCallback } from "Utils";
import GroupPill from "Features/sports/components/GroupPill";
import EditPillsButton from "Features/sports/components/EditPillsButton";

type CompetitionPillsListProps = {
  competitions: Array<CompetitionPillsList_Group>,
  onRemove?: CompetitionPillsList_Group => *,
  onAdd?: () => *,
  onClick?: CompetitionPillsList_Group => *,
  isActive?: CompetitionPillsList_Group => boolean,
};

const CompetitionPillsList = (props: CompetitionPillsListProps) => (
  <Flex style={{ flexWrap: "wrap" }}>
    {props.competitions.map(competition => {
      const onClick = makeOptionalCallback(props.onClick, competition);
      const onRemove = makeOptionalCallback(props.onRemove, competition);

      return (
        <Flex.Item key={competition.id} className="u-margin--sm">
          <GroupPill
            onClick={onClick}
            onRemove={onRemove}
            isActive={
              props.isActive
                ? props.isActive(competition)
                : competition.userFavourite
            }
            group={competition}
          />
        </Flex.Item>
      );
    })}
    {props.onAdd && (
      <Flex.Item className="u-margin--sm">
        <EditPillsButton onClick={props.onAdd} />
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
