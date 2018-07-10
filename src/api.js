import { sleep, cacheLocallyForMs, usingPOST, usingGET } from "./utils";

const cacheFor10s = cacheLocallyForMs(10000);
const fromHandshakeToPlayerSettings = data => {
  if (!data["common/composition/players"]) {
    return null;
  }

  return data["common/composition/players"].players[
    data["common/composition/session"].id
  ];
};

export const playerSettings = () => {
  return usingGET("/api-gw/api/common/handshake")
    .then(sleep(2000))
    .then(data => data.json())
    .then(fromHandshakeToPlayerSettings);
};

export const setAdventurerPublicity = (on = false) => {
  return usingPOST("/api-gw/api/common/command/setAdventurerPublicity", {
    body: JSON.stringify({
      on,
    }),
  });
};

export const setNewsletterSubscription = (on = false) => {
  return usingPOST("/api-gw/api/common/command/setNewsletterSubscription", {
    body: JSON.stringify({
      on,
    }),
  });
};

export const changeEmail = ({ email, password }) => {
  return usingPOST("/api-gw/api/common/command/changeEmail", {
    body: JSON.stringify({
      email,
      plaintextPassword: password,
    }),
  });
};

const fetchSuggestedGames = () => {
  return Promise.resolve()
    .then(sleep(2000))
    .then(() => [
      "https://images.casumo.com/2018/05/vikings_go_to_hell_thumbnail.jpg?dpr=2.63&markscale=100&markalign=top%2Ccenter&mark=https%3A%2F%2Fimages.casumo.com%2F2018%2F05%2Fvikings_go_to_hell_logo.png&w=205",
      "https://images.casumo.com/2018/05/lost_relics_thumbnail.jpg?dpr=2.63&markscale=100&markalign=top%2Ccenter&mark=https%3A%2F%2Fimages.casumo.com%2F2018%2F05%2Flost_relics_logo.png&w=206",
      "https://images.casumo.com/2016/05/live-blackjack-bg.jpg?dpr=2.63&markscale=100&markalign=top%2Ccenter&mark=https%3A%2F%2Fimages.casumo.com%2F2016%2F05%2Flive-blackjack-logo.png&w=206",
    ]);
};

export const suggestedGames = cacheFor10s(fetchSuggestedGames);
