// @flow
import React from "react";
import { gql } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { makeOptionalCallback } from "Utils";
import GroupPill from "Features/sports/components/GroupPill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
type CompetitionPillsListProps = {
    competitions: Array<A.CompetitionPillsList_Group>;
    onRemove?: A.CompetitionPillsList_Group;
};
 // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
 * ,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'onAdd'.
    onAdd ?  : () =>  * ,
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'onClick'. Did you mean 'onclick'... Remove this comment to see the full error message
    onClick ?  : A.CompetitionPillsList_Group;
 // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
 * ,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'isActive'.
    isActive ?  : A.CompetitionPillsList_Group;
// @ts-expect-error ts-migrate(2693) FIXME: 'boolean' only refers to a type, but is being used... Remove this comment to see the full error message
boolean,
;
;
const CompetitionPillsList = (props: CompetitionPillsListProps) => (<Flex gap="none" className="o-flex--wrap">
    {props.competitions.map(competition => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
    const onClick = makeOptionalCallback((props as any).onClick, competition);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0-1 arguments, but got 2.
    const onRemove = makeOptionalCallback(props.onRemove, competition);
    return (<Flex.Item key={competition.id} className="u-margin-y--sm u-margin-left--none u-margin-right--sm">
          <GroupPill onClick={onClick} onRemove={onRemove} isActive={(props as any).isActive
        ? (props as any).isActive(competition)
        : competition.userFavourite} group={competition}/>
        </Flex.Item>);
})}
    {(props as any).onAdd && (<Flex.Item className="u-margin--sm">
        <EditPillsButton onClick={(props as any).onAdd}/>
      </Flex.Item>)}
  </Flex>);
CompetitionPillsList.fragments = {
    group: gql `
    fragment CompetitionPillsList_Group on EventGroup {
      id
      userFavourite
      ...GroupPill_Group
    }
    ${GroupPill.fragments.group}
  `,
};
export default CompetitionPillsList;
