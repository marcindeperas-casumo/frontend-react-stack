import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";

const GAME_URL_REGEX = /(.*)(\/[a-zA-Z-]+)\/(launch$)/;

const isGameInProgress = () =>
  Boolean(window.location.href.match(GAME_URL_REGEX));

export const basicRedirectToGame = (slug: string) => {
  const [, baseUrl] = window.location.href.match(GAME_URL_REGEX);
  // eslint-disable-next-line fp/no-mutation
  window.location.href = `${baseUrl}/${slug}/launch`;
};

export const launchGame = ({
  slug,
  playForFun = false,
}: {
  slug: string;
  playForFun?: boolean;
}) => {
  if (isGameInProgress()) {
    basicRedirectToGame(slug);
    return;
  }

  bridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun,
  });
};
