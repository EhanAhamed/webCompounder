#!/usr/bin/env node

/* ES Module Imports */
import chalk from "chalk";
import { globby } from "globby";
import { createRequire } from "module";

/* CommonJS Require Definition */
const require = createRequire(import.meta.url);

/* CommonJS Imports */
const async = require("async");
const fs = require("fs");
const yargs = require("yargs");

/* Yargs CLI Setup */
yargs.usage(
  "\n" +
    chalk.blue("Usage:") +
    "\n" +
    chalk.yellow("> webCompounder ./pathTo/configFile.json") +
    "\n" +
    "\n" +
    chalk.blue("Read the documentation for further help.") +
    "\n" +
    chalk.blue("(https://webcompounder.ehan.dev/docs/)")
);
yargs.version("v1.1.4");
yargs.alias("v", "version");
yargs.alias("h", "help");

if (yargs.argv._[0] == null) {
  yargs.showHelp();
  yargs.exit(0);
}

if (yargs.argv._[1] == null && yargs.argv._[2] == null) {
  console.log(
    "\n" +
      chalk.blue("No CLI callback function was provided.") +
      "\n" +
      chalk.blue("Using default CLI callback.") +
      "\n"
  );
}

if (yargs.argv._[1] != null && yargs.argv._[2] == null) {
  console.log(
    "\n" +
      chalk.blue("CLI callback function parameter was Provided.") + "\n" +
      chalk.blue("Paremeter provided is ") + chalk.yellow(yargs.argv._[1]) + "\n" +"\n" +
      chalk.blue("However, no CLI callback function body was provided.") + "\n" +
      chalk.blue("Using default CLI callback.") +
      "\n"
  );
}

yargs.exit(0);


  if (
    Array.isArray(configJson.input) == true &&
    typeof configJson.output === "string"
  ) {
    async.waterfall(
      [
        async.apply(readInput, configJson.input),
        async.apply(writeOutput, configJson.output),
      ],
      new Function(
        configJson.callback.functionParameter,
        configJson.callback.functionBody
      )
    );
  }
}
function writeOutput(output, buffers, callback) {
  fs.writeFile(output, Buffer.concat(buffers), callback);
}

function readInput(input, callback) {
  async.mapSeries(input, readFile, callback);

  function readFile(input, callback) {
    fs.readFile(input, callback);
  }
}
