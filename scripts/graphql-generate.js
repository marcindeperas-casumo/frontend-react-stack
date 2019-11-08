#! /usr/bin/env node
const fs = require("fs");
const { resolve } = require("path");
const child_process = require("child_process");
const { DateTime } = require("luxon");
const R = require("ramda");
const prettier = require("prettier");
const glob = require("glob");
const babelParser = require("@babel/parser").parse;
const babelGenerator = require("@babel/generator").default;
const notEq = R.complement(R.equals);

child_process.exec(`cd ${resolve(__dirname, "..")}`);
// ^-- everything after that line will be relative to main directory

const TYPE_FILE_LOCATION = "src/types/apollo.js";

const args = getArgs();

const commands = [
  [
    "apollo",
    [
      "codegen:generate",
      TYPE_FILE_LOCATION,
      "--target=flow",
      `--includes=src/**/*{js,graphql}`,
      "--outputFlat",
      "--no-addTypename",
      "--passthroughCustomScalars",
      ...args,
    ],
  ],
  ["graphql-codegen", args],
];
let processes;

launchCommands();
function launchCommands() {
  // eslint-disable-next-line fp/no-mutation
  processes = commands.map(x => child_process.spawn(...x));

  processes.forEach(p => {
    p.stdout.on("data", handleOutput);
    p.stderr.on("data", handleError);
  });

  watchForNextUpdate();
}

function handleOutput(data) {
  const str = data.toString();
  const [, filename] = str.match(/Generate (.*?) \[completed\]/) || [];
  if (filename && filename !== "outputs") {
    logWithTime(`Generated: ${filename}`);
  }
}

function handleError(data) {
  const str = data.toString();
  if (/^ToolError:/.test(str)) {
    return;
  }
  // there's nothing usefull in other lines, just the same stacktrace
  const firstLine = str.split("\n")[0];
  // i consider this path weird because it contains three dots in the beginning
  // and it's not relative to alias or root, just three dots at seemingly random place...
  const [, weirdFilePath, error] =
    firstLine.match(/^\.{3}\/(.*?): (.*)$/) || [];
  const [, errorUrl] =
    firstLine.match(/FetchError: request to (.*?) failed,/) || [];

  killAll();
  if (weirdFilePath) {
    glob(`src/**/${weirdFilePath}`, {}, (err, files) => {
      console.error(`${error} (see: ${files[0]})`);
      if (args.length === 0) {
        // exit if we're not in --watch (any other arg will get stripped away)
        process.exit(2);
      }
      // if we are in watch mode it's likely that somebody just made typo.
      // There is no reason to punish it with we can recover from that.
      // Watcher will be triggered when broken file gets saved, we'll just
      // try to launch --watch commands like nothing happened
      // eslint-disable-next-line fp/no-mutating-methods
      const watcher = fs.watch(files[0], (event, filename) => {
        watcher.close();
        launchCommands();
      });
    });
  } else if (errorUrl) {
    console.error(`Unable to access ${errorUrl}`);
    process.exit(2);
  } else {
    console.error(str);
    process.exit(2);
  }
}

function watchForNextUpdate() {
  // eslint-disable-next-line fp/no-mutating-methods
  const watcher = fs.watch(TYPE_FILE_LOCATION, (event, filename) => {
    watcher.close();
    fs.readFile(TYPE_FILE_LOCATION, "utf8", function(err, fileContents) {
      if (err) {
        console.error("unable to read file: ", TYPE_FILE_LOCATION);
        process.exit(2);
      } else {
        beautifyTypeFile(fileContents);
      }
    });
  });
}

function beautifyTypeFile(fileContents, prefix = "g") {
  const ast = babelParser(fileContents, {
    tokens: true,
    sourceType: "module",
    plugins: ["flow", "estree"],
  });

  const content = babelGenerator(ast, { shouldPrintComment }, fileContents);

  const fixedFileContent = fixComments(content.code);
  const output = prettier.format(fixedFileContent, {
    trailingComma: "es5",
    parser: "babel",
  });

  fs.writeFile(TYPE_FILE_LOCATION, output, function(err) {
    if (!err) {
      logWithTime(`Generated: ${TYPE_FILE_LOCATION}`);
      setTimeout(watchForNextUpdate, 10);
    }
  });
}

function shouldPrintComment(comment) {
  const notWantedComments = [
    " @flow",
    " @flow ",
    " eslint-disable ",
    " This file was automatically generated and should not be edited.",
    "*\n * \n ", // empty 3-line block comment
  ];

  return !notWantedComments.some(y => comment === y);
}

function fixComments(afterBabel) {
  const tmp = afterBabel.replace(
    /\}; \/\/ ?={52,66}/g,
    "};\n\n// ===================================================="
  );

  return `// @flow\n${tmp}`;
}

function logWithTime(str) {
  const now = DateTime.local().toFormat("HH:mm:ss:SSS");

  console.log(`[${now}] ${str}`);
}

function killAll() {
  processes.forEach(p => {
    p.stdin.pause();
    p.kill();
  });
}

function getArgs() {
  const argv = process.argv.slice(2);
  if (argv.length > 0) {
    const notSupportedArgs = R.filter(notEq("--watch"), argv);
    if (notSupportedArgs.length > 0) {
      console.warn(
        `Only --watch is supported, ignoring: ${notSupportedArgs.join(", ")}`
      );
      return R.difference(argv, notSupportedArgs);
    }
  }

  return [];
}
