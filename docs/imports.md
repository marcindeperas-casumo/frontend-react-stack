# Path Mapping

We have few aliases that are making import cleaner. You can check list of current aliases in [.babelrc](https://github.com/Casumo/frontend-react-stack/blob/master/.babelrc). You should treat that file as source of truth.

**IMPORTANT!** - if you are implementing hot reloading for something you cannot use aliases inside `module.hot.accept`! You have to always use relative path there. See: https://github.com/gaearon/react-hot-loader/issues/560

**Note** - SASS imports with `~` in the beggining are using alias, see webpack config for details.

## Adding new alias

In perfect world you would have to touch only one file, but flow and vscode don't use babel config and you have to provide module mapping to them. Because of that you'll have to touch 3 files:

- .babelrc
- .flowconfig
- jsconfig.json

### .babelrc

Inside `module-resolver` configuration under `alias` add new key-value pair where the key will be an alias (ie. `Models`) and value will be a path to the desired folder (relative to .babelrc file).

```json
{
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "Models": "./src/models"
        }
      }
    ]
  ]
}
```

### .flowconfig

Find sections with values that begin with `module.name_mapper` and add new line with you alias. Syntax looks like this: `module.name_mapper='^NAME\(.*\)$' -> '<PROJECT_ROOT>/PATH\1'` where `NAME` is the desired name of your alias (ie. `Models` and `PATH` is relative path to this file (ie. `./src/models`).

```
module.name_mapper='^Models\(.*\)$' -> '<PROJECT_ROOT>/src/models\1'
```

### jsconfig.json

Under `compilerOptions` > `paths` add key-value pair where key will be alias (ie. `Models`) and value will be array with 2 path relative from `jsconfig.json` (ie. `["./src/models/*", "./src/models/*/index"]`).
**Note:** You have to add 2 paths to enable jump to definition for cases when you have file `index.js` in folder. VSCode is using TypeScript-like file resolution so it doesn't look for `index.js` by default!

```json
{
  "compilerOptions": {
    "paths": {
      "Models/*": ["./src/models/*", "./src/models/*/index"]
    }
  }
}
```
