/* @flow */
import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import Flex from "@casumo/cmp-flex";
import { VALUABLE_STATES, getValuablesByState } from "Models/valuables";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";
import { usePlayerValuableList } from "./usePlayerValuableList";
import "./PlayerValuableListHorizontal.scss";

export function PlayerValuableListVertical() {
  const { loading, valuables, translations } = usePlayerValuableList();
  const [mutateValuable] = useMutation<A.UseValuable, A.UseValuableVariables>(
    UseValuable
  );
  const consumeValuable = (id: string) =>
    mutateValuable({
      variables: {
        id,
        source: "mobile",
      },
    });
  const {
    availableListTitleLabel,
    lockedListTitleLabel,
    noValuablesLabel,
  } = translations;
  const getAvailableValuables = getValuablesByState(VALUABLE_STATES.FRESH);
  const getLockedValuables = getValuablesByState(VALUABLE_STATES.LOCKED);
  const sections = [
    {
      title: availableListTitleLabel,
      data: getAvailableValuables(valuables),
    },
    {
      title: lockedListTitleLabel,
      data: getLockedValuables(valuables),
    },
  ].filter(section => section.data.length > 0);

  if (!valuables.length) {
    return <EmptyValuablesList message={noValuablesLabel} />;
  }

  return (
    <Flex className="u-padding-top--lg c-player-valuables-list u-padding-bottom--lg t-background-white">
      {sections.map(section => (
        <ValuablesVerticalList
          className="u-padding-x--md"
          valuables={valuables}
          title={section.title}
          translations={translations}
          loading={loading}
          onConsumeValuable={consumeValuable}
        />
      ))}
    </Flex>
  );
}
