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
if (typeof yargs.argv._[0] === "undefined") {
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
    validateConfig();
  }
});

function validateConfig() {
  /* Config File Validation */
  if (typeof configJson.workflow === "undefined") {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("workflow") +
        chalk.red('" ') +
        chalk.red("value was not found in config file.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (typeof configJson.input === "undefined") {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("input") +
        chalk.red('" ') +
        chalk.red("value was not found in config file.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (typeof configJson.output === "undefined") {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("output") +
        chalk.red('" ') +
        chalk.red("value was not found in config file.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.workflow !== "undefined" &&
    typeof configJson.workflow !== "string"
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("workflow") +
        chalk.red('" ') +
        chalk.red("value is not a string.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.input !== "undefined" &&
    typeof configJson.input !== "string" &&
    Array.isArray(configJson.input) == false
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("input") +
        chalk.red('" ') +
        chalk.red("value is not an array or a string.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.output !== "undefined" &&
    typeof configJson.output !== "string"
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.yellow('"output"') +
        chalk.red("value is not a string.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.workflow !== "undefined" &&
    typeof configJson.workflow === "string" &&
    configJson.workflow != "bundle"
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.yellow('"workflow" ') +
        chalk.red("value is not a supported workflow type.") +
        "\n" +
        chalk.red("Value provided was ") +
        chalk.yellow('"' + configJson.workflow + '"') +
        "\n" +
        "\n" +
        chalk.blue("Currently supported workflow types include ") +
        chalk.yellow('"bundle"') +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.input !== "undefined" &&
    typeof configJson.input === "string"
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.yellow('"input"') +
        chalk.red("value is a string, which is not supported yet.") +
        "\n"
    );
    yargs.exit(1);
  }
  if (
    typeof configJson.output !== "undefined" &&
    typeof configJson.output !== "string" &&
    Array.isArray(configJson.output) == true
  ) {
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.red('"') +
        chalk.yellow("output") +
        chalk.red('" ') +
        chalk.red("value is an array, which is not supported yet.") +
        "\n"
    );
    yargs.exit(1);
  }

  /*
  const inputPaths = globby(configJson.input);

  async.waterfall(
    [
      async.apply(readInput, inputPaths),
      async.apply(writeOutput, configJson.output),
    ],
    new Function(callback.functionParameter, callback.functionBody)
  );

  function writeOutput(output, buffers, callback) {
    fs.writeFile(output, Buffer.concat(buffers), callback);
  }

  function readInput(input, callback) {
    async.mapSeries(input, readFile, callback);

    function readFile(input, callback) {
      fs.readFile(input, callback);
    }
  }
*/
}
