import React from "react";
import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { navigateById } from "Services/NavigationService";
import { isDesktop } from "Components/ResponsiveLayout";

export type TGameExcludedPage = {
  button_redirect: string;
  excluded_game_text: string;
  excluded_game_text_title: string;
  redirect_button_text: string;
  play_okay_logo: string;
};

type TProps = {
  t: TGameExcludedPage;
};

export const GameExcludedPage: React.FC<TProps> = ({ t }: TProps) => {
  return (
    <div>
      <Flex
        direction={isDesktop() ? "horizontal" : "vertical"}
        justify="center"
        align="center"
        className="u-padding-top--lg u-margin-bottom--3xlg"
      >
        <Flex.Item
          className="o-flex--vertical o-flex-justify--space-between"
          style={{ height: "calc(100% - 95px)" }}
        >
          <img
            className="u-display--block t-border-r--circle"
            width={104}
            height={64}
            alt=""
            src={t.play_okay_logo}
          />
          <Text className="u-font-lg u-font-weight-bold u-margin-bottom">
            {t.excluded_game_text_title || "You have this Game Type blocked"}
          </Text>
          <Text className="u-margin-top--none">
            {t.excluded_game_text || ""}
          </Text>
          <ButtonPrimary
            size="sm"
            className="u-width--full"
            onClick={() =>
              navigateById({
                routeId: t.button_redirect,
              })
            }
          >
            {t.redirect_button_text}
          </ButtonPrimary>
        </Flex.Item>
      </Flex>
    </div>
  );
};
