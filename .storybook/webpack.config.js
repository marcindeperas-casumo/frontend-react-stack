const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ourConfig = require("../config/webpack.config");
const getClientEnvironment = require("../config//env");
const env = getClientEnvironment("casumo.com");

module.exports = ({ config, mode }) => {
  const ourDefaultConfig = ourConfig("development", { isStorybook: true });

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin(env.stringified),
      new webpack.NormalModuleReplacementPlugin(
        /applicationService\/logger/,
        path.resolve(__dirname, "fakeLogger.js") // extension required!
      ),
      /**
       * Resolves hooks to their mocks in stories if the mock exists.
       *
       * Example:
       * `import { useLocale } from "Hooks/useLocale";` ---> will resolve to:
       *   `"Hooks/__mocks__/useLocale"` if it exists.
       *
       * Bare in mind that the related mock file will be **always** used if it exists
       * (like old auto-mocking feature in jest).
       *
       * Why?
       * You might have hook that fetches some data, selects other data from the store
       * and returns that in the end. While you should test hook by itself it's pointless
       * to have the same store mocks everywhere. Now you can just create a mock that
       * returns the desired object and don't care about what happens inside when you
       * test component that is using it.
       *
       * There's one known issue that might become somehow more visible now:
       *    https://github.com/webpack/webpack/issues/6036#issuecomment-464355189
       * Because of how webpack currently works if during compilation hook gets
       * resolved to mocked file it'll require re-compilation when mocked file
       * gets removed or renamed.
       */
      new webpack.NormalModuleReplacementPlugin(/\.js$/, resource => {
        if (/__mocks__/.test(resource.request)) {
          // don't touch mocked files imports
          return;
        }

        const resPath = resource.request.split("!")[1];
        if (!resPath) {
          return;
        }

        const dirname = path.dirname(resPath);
        const basename = path.basename(resPath);
        const folderMockPath = `${dirname}/__mocks__/${basename}`;

        if (fs.existsSync(folderMockPath)) {
          resource.request = folderMockPath; // eslint-disable-line fp/no-mutation
        } else {
          return;
        }

        // In the NormalModuleReplacementPlugin the regexp is tested two times,
        // once before the resolution on the request and once after the resolution on
        // the resource. If it happens after resolution you have to replace .resource
        //   see: https://stackoverflow.com/questions/56741909/normalmodulereplacementplugin-does-not-work-when-modifying-resourceregexp-slight
        if (resource.resource) {
          resource.resource = resource.request; // eslint-disable-line fp/no-mutation
        }
      }),
    ],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...ourDefaultConfig.resolve.alias,
      },
      extensions: ourDefaultConfig.resolve.extensions,
    },
    /**
     * when i created this baseConfig had 2 loaders (.md &.js) if something
     * broke after update check what's inside `baseConfig.module.rules`
     */
    module: ourDefaultConfig.module,
  };
};
