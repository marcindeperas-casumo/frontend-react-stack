import React from "react";
import * as A from "Types/apollo";
import { useMutation } from "@apollo/client";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import MaskImage from "Components/MaskImage";
import { ValuableCard } from "Components/ValuableCard";
import { GameRowCustomHeader } from "Components/GameRow";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { getPlatform } from "Utils/utils";
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";
import { PUSHER_MODAL_STATE } from "Components/Pusher/PusherModal";
import { PlayerValuableListVertical } from "Components/PlayerValuableList";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import Cashback from "Components/ValuableThumbnail/Icons/cashback.svg";

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);
type Props = {
  pusherData: PusherPaylod;
  pusherModalState: PUSHER_MODAL_STATE;
  setPusherModalState: (state: PUSHER_MODAL_STATE) => void;
};

type ValuablePopupContentProps = {
  valuable: A.ValuableDetails_PlayerValuableFragment;
  translations: Omit<A.PlayerValuablesQuery, "player">;
  closeModal: () => void;
};

export const XMAS_CAMPAIGN_SLUG = "xmas-2021";

const ValuablePopupContent = ({
  valuable,
  translations,
  closeModal,
}: ValuablePopupContentProps) => {
  const [mutateValuable] = useMutation<
    A.UseValuableMutation,
    A.UseValuableMutationVariables
  >(UseValuable);

  const consumeValuable = () => {
    return mutateValuable({
      variables: {
        id: valuable.id,
        source: getPlatform(),
      },
    }).then(closeModal);
  };

  return (
    <ValuableDetailsContainer
      valuableDetails={valuable}
      onConsumeValuable={consumeValuable as any}
    >
      <div className="c-valuable-details__valuable-card o-position--relative">
        <ValuableCard
          translations={translations}
          {...valuable}
          caveat={null}
          className="t-elevation--10"
        />
      </div>
    </ValuableDetailsContainer>
  );
};

export const CustomLoginCampaign = ({
  pusherData,
  pusherModalState,
  setPusherModalState,
}: Props) => {
  if (!pusherData) {
    return null;
  }

  const showValuable = () =>
    setPusherModalState(PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE);
  const closeModal = () => setPusherModalState(PUSHER_MODAL_STATE.HIDDEN);

  const { loading, valuables, translations } = usePlayerValuableList();
    // usePlayerValuableList({ badgeRuleName: 'XMAS_CAMPAIGN_SLUG' });

  if (!loading && pusherModalState === PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE) {
    return (
      <ValuablePopupContent
        valuable={valuables[0]}
        translations={translations}
        closeModal={closeModal}
      />
    );
  }

  return (
    <div>
      <div className="o-ratio c-valuable-details t-border-r--md">
        <div className="o-ratio__content c-valuable-details__header">
          <MaskImage
            id={`123`}
            imageUrl={
              "https://images.casumo.com/2019/04/background-deposit.png?w=250&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1"
            }
            width={375}
            height={334}
          >
            <HeaderImgMask />
          </MaskImage>
        </div>
      </div>
      <div className="u-padding-x--md">
        <Flex
          direction="vertical"
          align="left"
          className="u-margin-bottom--lg u-margin-top--xlg"
        >
          {valuables.slice(0, 3).map(val => (
            <Flex.Item>
              <Flex
                style={{ width: "160px" }}
                className={"text-yellow-30 u-cursor--pointer u-padding-x--md"}
                onClick={showValuable}
                align="center"
              >
                <Flex.Item style={{ width: "160px" }}>
                  <Cashback className="u-width--full" />
                </Flex.Item>
                <Flex.Item>
                  Valuable
                </Flex.Item>
              </Flex>
            </Flex.Item>
          ))}

          <Flex.Item className=" u-margin-y--md">
            <hr className="c-valuable-details__separator t-border t-border-r--pill border-grey-0" />
          </Flex.Item>

          <Flex.Item>
            <PlayerValuableListVertical
              badgeRuleName={XMAS_CAMPAIGN_SLUG}
              hideTitles
            />
          </Flex.Item>

          <Flex.Item>
            <GameRowCustomHeader
              header="titles.game-of-the-day"
              gameSlug={pusherData.Data.game}
            />
          </Flex.Item>
        </Flex>

        <div className="c-valuable-details__footer u-padding--md o-position--sticky o-inset-bottom--none">
          <ButtonPrimary
            className="u-width--full"
            onClick={() => {}}
            data-test="valuable-action-button"
          >
            Button
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
