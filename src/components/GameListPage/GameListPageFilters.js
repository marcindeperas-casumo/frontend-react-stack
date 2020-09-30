// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { ModalBase, ModalHeader } from "Components/RSModal";
import { Toggle } from "Components/Toggle/Toggle";
import { useTranslations } from "Utils/hooks";
import { interpolate } from "Utils";
import { FilterChip, FilterCheckbox } from "Components/FilterComponents";
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
          ({ key, type, title, description, values }) => {
            const isHorizontal = type === "toggle";

            return (
              <Flex
                key={key}
                justify={isHorizontal ? "space-between" : "start"}
                direction={isHorizontal ? "horizontal" : "vertical"}
                className="u-padding-y--xlg t-border-bottom t-color-grey-5 o-flex__item--no-shrink"
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
                  {values.map(x => {
                    const isActive = props.activeFilters[x.query];
                    const onChange = () => {
                      props.setFilters({
                        ...props.activeFilters,
                        [x.query]: !isActive,
                      });
                    };

                    if (type === "toggle") {
                      return (
                        <Toggle
                          key={x.key}
                          checked={isActive}
                          onChange={onChange}
                        />
                      );
                    } else if (!x.title) {
                      // all filters except toggle need title, hide them if translations are missing
                      return null;
                    } else if (type === "chip") {
                      return (
                        <FilterChip
                          key={x.key}
                          onChange={onChange}
                          isActive={isActive}
                          title={x.title}
                        />
                      );
                    } else if (type === "checkbox") {
                      return (
                        <FilterCheckbox
                          key={x.key}
                          onChange={onChange}
                          isActive={isActive}
                          title={x.title}
                        />
                      );
                    }

                    return null;
                  })}
                </Flex>
              </Flex>
            );
          }
        )}
        <Flex className="u-padding--2xlg o-flex__item--no-shrink" />
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
