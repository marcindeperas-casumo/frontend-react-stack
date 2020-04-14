import { injectScript } from "Utils";
import logger from "Services/logger";
import { getUrlForEnv } from "./netentConstants";

export async function getNetentGlobalObject(env) {
  if (!window.netent) {
    await injectScript(getUrlForEnv(env));
  }

  return window.netent;
}

export async function tryLaunchGame(env, config, onSuccess, onError) {
  const netent = await getNetentGlobalObject(env);

  if (netent) {
    if (config.liveCasinoHost) {
      //eslint-disable-next-line fp/no-let
      let tables;
      try {
        //eslint-disable-next-line fp/no-mutation
        tables = await getLiveTablesForGames(env, {
          gameServerURL: `https://${config.liveCasinoHost}`,
          staticServer: config.staticServer,
          casinoId: config.casinoId,
        });
      } catch (error) {
        return onError(`no open tables for ${config.gameId}`);
      }

      return netent.launch(
        {
          ...config,
          tableId: getFirstOpenTableForGame(config.gameId, tables),
        },
        onSuccess,
        onError
      );
    } else {
      return netent.launch(config, onSuccess, onError);
    }
  }

  return onError("global netent object not found");
}

export async function getLiveTablesForGames(env, config) {
  const netent = await getNetentGlobalObject(env);

  if (netent) {
    return await new Promise((resolve, reject) => {
      netent.getOpenTables(config, resolve, reject);
    });
  } else {
    logger.error("global netent object not found");
  }

  return null;
}

export const getOpenTablesByGame = tables => {
  return Object.values(tables).reduce((mappedTables, table) => {
    return {
      ...mappedTables,
      ...table.games.reduce((games, game) => {
        return {
          ...games,
          [game.gameId]: {
            ...games[game.gameId],
            openTables: [
              ...(mappedTables[game.gameId]?.openTables || []),
              ...[table.tableId],
            ],
          },
        };
      }, {}),
    };
  }, {});
};

export const getFirstOpenTableForGame = (gameId, tables) => {
  return getOpenTablesByGame(tables)[gameId]?.openTables[0];
};
