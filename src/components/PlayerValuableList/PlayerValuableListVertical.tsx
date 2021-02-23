/* @flow */
import * as React from "react";
import { useMutation } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { VALUABLE_STATES, getValuablesByState } from "Models/valuables";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/PlayerValuableList/... Remove this comment to see the full error message
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";
import { usePlayerValuableList } from "./usePlayerValuableList";
import "./PlayerValuableListHorizontal.scss";

export function PlayerValuableListVertical() {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Boolean... Remove this comment to see the full error message
  const { loading, valuables, translations } = usePlayerValuableList();
  const [mutateValuable] = useMutation<A.UseValuable, A.UseValuableVariables>(
    UseValuable
  );

  if (loading || !translations) {
    return null;
  }

  const consumeValuable = (id: string) =>
    mutateValuable({
      variables: {
        id,
        source: "mobile",
      },
    });
  const {
    availableListTitleLabel,
    usedListTitleLabel,
    lockedListTitleLabel,
    noValuablesLabel,
  } = translations;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'FRESH' does not exist on type '{}'.
  const getAvailableValuables = getValuablesByState([VALUABLE_STATES.FRESH]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'USED' does not exist on type '{}'.
  const getUsedValuables = getValuablesByState([VALUABLE_STATES.USED]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
  const getLockedValuables = getValuablesByState([VALUABLE_STATES.LOCKED]);
  const sections = [
    {
      id: "list-available",
      title: availableListTitleLabel,
      data: getAvailableValuables(valuables),
    },
    {
      id: "list-used",
      title: usedListTitleLabel,
      data: getUsedValuables(valuables),
    },
    {
      id: "list-locked",
      title: lockedListTitleLabel,
      data: getLockedValuables(valuables),
    },
  ].filter(section => section.data.length > 0);

  if (!valuables.length) {
    return (
      <div className="u-padding-top--lg">
        <EmptyValuablesList message={noValuablesLabel} />
      </div>
    );
  }

  return (
    <Flex
      direction="vertical"
      className="c-player-valuables-list u-padding-bottom--lg t-background-white"
    >
      {sections.map(section => (
        <ValuablesVerticalList
          key={section.title}
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[] | Dictionary<unknown>' is not assi... Remove this comment to see the full error message
          valuables={section.data}
          title={section.title}
          translations={translations}
          loading={loading}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(id: string) => Promise<FetchResult<A.UseVal... Remove this comment to see the full error message
          onConsumeValuable={consumeValuable}
          isItemSelectable={false}
          data-test-id={section.id}
        />
      ))}
    </Flex>
  );
}
