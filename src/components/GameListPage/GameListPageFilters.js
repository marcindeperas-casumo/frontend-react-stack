// @flow
import * as React from "react";
import classNames from "classnames";
import { ChipChoice } from "@casumo/cmp-chip";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { ModalBase, ModalHeader } from "Components/RSModal";
import { Toggle } from "Components/Toggle/Toggle";
import { CheckboxSquare } from "Components/Checkbox/CheckboxSquare";
import { useTranslations } from "Utils/hooks";
import { interpolate } from "Utils";
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
  const t = useTranslations<{
    title: string,
    modal_button: string,
  }>("new-game-browser.filtering");

  return (
    <ModalBase
      isOpen={props.isOpen}
      onRequestClose={props.close}
      mustAccept={false}
    >
      <ModalHeader showCloseButton closeAction={props.close} title={t?.title} />
      <Flex
        direction="vertical"
        className="u-overflow-y--auto u-padding-x--xlg"
      >
        {props.availableFilters.map(
          ({ key, type, title, description, values }) => (
            <Flex
              key={key}
              justify={type === "toggle" ? "space-between" : "start"}
              direction={type === "toggle" ? "horizontal" : "vertical"}
              className="u-padding-y--xlg t-border-bottom t-color-grey-5"
            >
              <Flex
                direction="vertical"
                className={classNames("t-color-grey-90", {
                  "u-padding-bottom--md": type !== "toggle",
                })}
              >
                <Text className="u-font-weight-black">{title}</Text>
                <Text size="sm">{description}</Text>
              </Flex>
              <Flex spacing="none" className="o-flex--wrap">
                {values.map(y => {
                  const isActive = props.activeFilters[y.query];
                  const onChange = () => {
                    props.setFilters({
                      ...props.activeFilters,
                      [y.query]: !isActive,
                    });
                  };

                  if (type === "toggle") {
                    return (
                      <Toggle
                        key={y.key}
                        checked={isActive}
                        onChange={onChange}
                      />
                    );
                  } else if (!y.title) {
                    // all filters except toggle need title, hide them if translations are missing
                    return null;
                  } else if (type === "chip") {
                    return (
                      <Flex.Item
                        key={y.key}
                        className="u-margin-right--sm u-margin-bottom--sm"
                      >
                        <ChipChoice onClick={onChange} isActive={isActive}>
                          {y.title}
                        </ChipChoice>
                      </Flex.Item>
                    );
                  } else if (type === "checkbox") {
                    return (
                      <Flex
                        key={y.key}
                        align="center"
                        justify="space-between"
                        className="u-width--full u-padding-y--md t-border-bottom t-color-grey-5"
                      >
                        <Text className="t-color-grey-90">{y.title}</Text>
                        <CheckboxSquare
                          checked={isActive}
                          onChange={onChange}
                        />
                      </Flex>
                    );
                  }

                  return null;
                })}
              </Flex>
            </Flex>
          )
        )}
        <Flex className="u-padding--2xlg" />
      </Flex>
      <Flex className="u-padding-x--md u-padding-y--xlg u-position-absolute u-bottom-0 u-left-0 u-right-0 c-game-list-page-filters__main-button-bg">
        <ButtonPrimary className="u-width--full" onClick={props.close}>
          {interpolate(t?.modal_button || "", {
            numberOfGames: props.numberOfGames,
          })}
        </ButtonPrimary>
      </Flex>
    </ModalBase>
  );
}
