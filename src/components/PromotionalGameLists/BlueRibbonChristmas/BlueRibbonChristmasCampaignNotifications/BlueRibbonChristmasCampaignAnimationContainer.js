// @flow
import * as React from "react";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { BlueRibbonAnimation } from "Components/BlueRibbon";
import { useJackpotsSubscription } from "../useJackpotsSubscription";

export function BlueRibbonChristmasCampaignAnimationContainer() {
  const { pauseGame, resumeGame } = useGameModelContext();

  const { isFullScreen, jackpotAmount, type } = useJackpotsSubscription({
    pauseGame,
    resumeGame,
  });

  return (
    isFullScreen &&
    jackpotAmount &&
    type && <BlueRibbonAnimation type={type} amount={jackpotAmount} />
  );
}

// function JackpotAmount({ value }: { value: string }) {
//   return (
//     <Flex justify="center" className="c-game-notification__win-amount--size">
//       <Text
//         tag="span"
//         size="3xlg"
//         className="t-color-yellow-30 u-font-weight-black u-text-align-center u-position-absolute c-game-notification__win-amount--effect"
//       >
//         {value}
//       </Text>
//       <Text
//         tag="span"
//         size="3xlg"
//         className="t-color-yellow-30 u-font-weight-black u-text-align-center u-position-absolute"
//       >
//         {value}
//       </Text>
//     </Flex>
//   );
// }

// export function BlueRibbonChristmasCampaignNotificationsContainer() {
//   const { pauseGame, resumeGame } = useGameModelContext();
//   const { response } = useFetch(urls.handshake);
//   const available = R.propOr(false, "available", response);

//   if (!available) {
//     return null;
//   }

//   return (
//     <BlueRibbonChristmasCampaignNotifications
//       pauseGame={pauseGame}
//       resumeGame={resumeGame}
//     />
//   );
// }
