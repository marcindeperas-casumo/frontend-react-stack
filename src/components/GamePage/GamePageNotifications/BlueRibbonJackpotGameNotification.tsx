import * as React from "react";
import { useDispatch } from "react-redux";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import DangerousHtml from "Components/DangerousHtml";
import { useGameJackpotContext } from "Components/GamePage/Contexts";

export function BlueRibbonJackpotGameNotification() {
  const { blueribbonJackpotForCurrentGame } = useGameJackpotContext();
  const [acknowledged, setAcknowledged] = React.useState(false);
  const dispatch = useDispatch();

  const userHasSeenJackpotOffer = localStorage.getItem("JackpotOfferPresented");

  React.useEffect(() => {
    if (
      blueribbonJackpotForCurrentGame &&
      !blueribbonJackpotForCurrentGame.optedIn &&
      !userHasSeenJackpotOffer
    ) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.GAMELAUNCH_MODAL, {
          slug: blueribbonJackpotForCurrentGame.slug,
        })
      );
    }
  }, [blueribbonJackpotForCurrentGame, userHasSeenJackpotOffer, dispatch]);

  if (!blueribbonJackpotForCurrentGame || acknowledged) {
    return null;
  } else if (!blueribbonJackpotForCurrentGame.requiresManualOptIn) {
    return (
      <Flex
        direction="horizontal"
        className="u-padding--md bg-white t-border-r u-margin-bottom--md"
        align="center"
      >
        <Flex.Item className="o-position--relative">
          <img
            className="u-display--block t-border-r--circle"
            width={56}
            height={56}
            alt=""
            src={blueribbonJackpotForCurrentGame.image}
          />
        </Flex.Item>
        <Flex.Block>
          <Text size="sm" tag="span" className="text-black">
            <DangerousHtml
              html={blueribbonJackpotForCurrentGame.notifications.gameLaunch}
            />
          </Text>
        </Flex.Block>
        <Flex.Item>
          <div
            onClick={() => setAcknowledged(true)}
            className="t-border-r--circle bg-grey-0 u-padding u-cursor--pointer"
          >
            <CloseIcon className="text-black" />
          </div>
        </Flex.Item>
      </Flex>
    );
  } else if (blueribbonJackpotForCurrentGame.optedIn) {
    return (
      <Flex
        direction="horizontal"
        className="u-padding--md bg-white t-border-r u-margin-bottom--md"
        spacing="md"
      >
        <Flex.Item className="o-position--relative">
          <img
            className="u-display--block t-border-r--circle"
            width={56}
            height={56}
            alt=""
            src={blueribbonJackpotForCurrentGame.image}
          />
        </Flex.Item>
        <Flex.Block spacing="md">
          <Text
            tag="span"
            className="u-font-weight-bold text-black u-display--block u-margin-bottom--sm"
          >
            <DangerousHtml
              html={blueribbonJackpotForCurrentGame.notifications.optIn.title}
            />
          </Text>
          <Text tag="span" className="text-grey-50 u-display--block">
            <DangerousHtml
              html={blueribbonJackpotForCurrentGame.notifications.optIn.content}
            />
          </Text>
        </Flex.Block>
        <Flex.Item>
          <div
            onClick={() => setAcknowledged(true)}
            className="u-padding u-cursor--pointer"
          >
            <CloseIcon className="text-black" />
          </div>
        </Flex.Item>
      </Flex>
    );
  }

  return null;
}
