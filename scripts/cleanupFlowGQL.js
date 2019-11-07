#! /usr/bin/env node
const fs = require("fs");
const { resolve } = require("path");
const child_process = require("child_process");
const babelParser = require("@babel/parser").parse;
const babelGenerator = require("@babel/generator").default;
const babelTraverse = require("@babel/traverse").default;

const gqlFlowTypes = resolve(__dirname, "../src/types/apollo.js");

fs.stat(gqlFlowTypes, function(err, fileStat) {
  if (err && err.code === "ENOENT") {
    console.log(`File not found: ${gqlFlowTypes}`);
  } else if (fileStat && fileStat.isFile()) {
    readFile();
  }
});

function readFile() {
  fs.readFile(gqlFlowTypes, "utf8", function(err, fileContents) {
    if (err) {
      console.log("unable to read file");
    }
    manipulate(fileContents);
  });
}

function writeFile(updatedFile) {
  fs.writeFile(gqlFlowTypes, updatedFile, function(err) {
    if (err) {
      throw err;
    } else {
      triggerPrettier();
    }
  });
}

function triggerPrettier() {
  // prettier api is to complex for that :P
  child_process.exec(`prettier --write ${gqlFlowTypes}`);
}

function filterOutComments(comment) {
  const notWantedComments = [
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

  writeFile(`// @flow\n${tmp}`);
}

function manipulate(fileContents, prefix = "g") {
  const ast = babelParser(fileContents, {
    tokens: true,
    sourceType: "module",
    plugins: ["flow", "estree"],
  });

  // /* eslint-disable fp/no-mutation */
  // babelTraverse(ast, {
  //   TypeAlias: function({ node }) {
  //     node.id.name = `${prefix}${node.id.name}`;
  //   },
  //   GenericTypeAnnotation: function({ node }) {
  //     const typesThatShouldntBePrefixed = ["Array", "BigInt", "Long"];
  //     // those 3 types will fall here as well, we shouldn't prefix them
  //     if (!typesThatShouldntBePrefixed.some(x => x === node.id.name)) {
  //       node.id.name = `g${node.id.name}`;
  //     }
  //   },
  // });
  // /* eslint-enable fp/no-mutation */

  const content = babelGenerator(
    ast,
    { shouldPrintComment: filterOutComments },
    fileContents
  );

  fixComments(content.code);
}
