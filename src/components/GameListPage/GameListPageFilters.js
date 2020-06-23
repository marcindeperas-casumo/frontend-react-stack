// @flow
import * as React from "react";
import { ChipFilterable } from "@casumo/cmp-chip";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Button } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { ModalBase, ModalHeader } from "Components/RSModal";
import { Toggle } from "Components/Toggle/Toggle";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";
import "./gameListPageFilters.scss";

type Props = {
  isOpen: boolean,
  setFilters: any => void,
  close: () => void,
  availableFilters: Array<A.GetGameSets_gameSetsList_additionalFilterGroups>,
  activeFilters: { [string]: boolean },
  numberOfGames: number,
};
export function GameListPageFilters(props: Props) {
  return (
    <ModalBase
      isOpen={props.isOpen}
      onRequestClose={props.close}
      mustAccept={false}
    >
      <ModalHeader showCloseButton closeAction={props.close} title="Filters" />
      <Flex
        direction="vertical"
        className="u-overflow-y--auto u-padding-x--xlg"
      >
        {props.availableFilters.map(x => (
          <Flex
            key={x.key}
            direction="vertical"
            className="u-padding-y--xlg t-border-bottom"
          >
            <Flex direction="vertical" className="u-padding-bottom--md">
              <Text className="u-font-weight-black">{x.key}</Text>
              <Text size="sm">Description will be here</Text>
            </Flex>
            <Flex className="o-flex--wrap">
              {x.values.map(y => {
                const isActive = props.activeFilters[y.query];
                const onChange = () => {
                  props.setFilters({
                    ...props.activeFilters,
                    [y.query]: !isActive,
                  });
                };

                if (y.type === "chip") {
                  return (
                    <ChipFilterable
                      key={y.key}
                      onClick={onChange}
                      isActive={isActive}
                    >
                      {y.key}
                    </ChipFilterable>
                  );
                } else if (y.type === "toggle") {
                  return (
                    <Toggle
                      key={y.key}
                      checked={isActive}
                      onChange={onChange}
                    />
                  );
                } else if (y.type === "checkbox") {
                  return (
                    <Flex
                      key={y.key}
                      align="center"
                      justify="space-between"
                      className="u-width--full u-padding-y--md t-border-bottom"
                    >
                      {y.key}
                      <CheckboxSquare checked={isActive} onChange={onChange} />
                    </Flex>
                  );
                }

                return null;
              })}
            </Flex>
          </Flex>
        ))}
        <Flex className="u-padding--2xlg" />
      </Flex>
      <Flex className="u-padding-x--md u-padding-y--xlg u-position-absolute u-bottom-0 u-left-0 u-right-0 c-game-list-page-filters__main-button-bg">
        <Button
          variant="primary"
          className="u-width--full"
          onClick={props.close}
        >
          Show {props.numberOfGames} games
        </Button>
      </Flex>
    </ModalBase>
  );
}
