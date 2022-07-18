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

/* Show Help */
if (yargs.argv._[0] == null) {
  yargs.showHelp();
  yargs.exit(0);
}

let configJson;

fs.readFile(yargs.argv._[0], { encoding: "utf8" }, (error, configFile) => {
  if (error) {
    console.error(
      "\n" +
        chalk.red("Errored while loading config file!") +
        "\n" +
        "\n" +
        chalk.red("ERROR:") +
        "\n" +
        error +
        "\n"
    );
    yargs.exit(1);
  } else {
    console.log("\n" + chalk.green("Sucessfully loaded config file!") + "\n");
    try {
      configJson = JSON.parse(configFile);
    } catch (error) {
      console.error(
        "\n" +
          chalk.red("Errored while parsing config JSON!") +
          "\n" +
          "\n" +
          chalk.red("ERROR:") +
          "\n" +
          error +
          "\n"
      );
      yargs.exit(1);
    }
  }
});

/*
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

function writeOutput(output, buffers, callback) {
  fs.writeFile(output, Buffer.concat(buffers), callback);
}

function readInput(input, callback) {
  async.mapSeries(input, readFile, callback);

function readFile(input, callback) {
  fs.readFile(input, callback);
}
*/
