// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import { ChipFilterable } from "@casumo/cmp-chip";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Button } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { ModalBase, ModalHeader } from "Components/RSModal";
import { Toggle } from "Components/Toggle/Toggle";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";
import { useTranslations } from "Utils/hooks";
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
  const gameStudioTranslations = R.pipe(
    R.propOr([], "studios"),
    R.map(x => [x.id, x.name]),
    R.fromPairs
  )(
    useTranslations<{
      studios: Array<{
        background: string,
        id: string,
        logo: string,
        name: string,
      }>,
    }>("grouped-lists.game-studios")
  );

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
            justify={x.type === "toggle" ? "space-between" : "start"}
            direction={x.type === "toggle" ? "horizontal" : "vertical"}
            className="u-padding-y--xlg t-border-bottom"
          >
            <Flex
              direction="vertical"
              className={classNames({
                "u-padding-bottom--md": x.type !== "toggle",
              })}
            >
              <Text className="u-font-weight-black">{x.key}</Text>
              <Text size="sm">Description will be here</Text>
            </Flex>
            <Flex className="o-flex--wrap">
              {x.values.map(y => {
                const valueTranslation = gameStudioTranslations[y.key] || y.key;
                const isActive = props.activeFilters[y.query];
                const onChange = () => {
                  props.setFilters({
                    ...props.activeFilters,
                    [y.query]: !isActive,
                  });
                };

                if (x.type === "chip") {
                  return (
                    <ChipFilterable
                      key={y.key}
                      onClick={onChange}
                      isActive={isActive}
                    >
                      {valueTranslation}
                    </ChipFilterable>
                  );
                } else if (x.type === "toggle") {
                  return (
                    <Toggle
                      key={y.key}
                      checked={isActive}
                      onChange={onChange}
                    />
                  );
                } else if (x.type === "checkbox") {
                  return (
                    <Flex
                      key={y.key}
                      align="center"
                      justify="space-between"
                      className="u-width--full u-padding-y--md t-border-bottom"
                    >
                      {valueTranslation}
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
