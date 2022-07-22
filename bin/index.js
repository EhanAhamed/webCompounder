#!/usr/bin/env node

/*!
 * webCompounder v1.1.5 (https://webcompounder.ehan.dev/) (https://github.com/EhanAhamed/webCompounder/)
 * Copyright (c) 2022 Ehan Ahamed and contributors
 * Licensed Under the UPL-1.0 License (https://github.com/EhanAhamed/webCompounder/blob/main/LICENSE.txt)
 */

/* Import ES Modules */
import chalk from "chalk";
import { globby } from "globby";
import { createRequire } from "module";

/* Define CommonJS Require */
const require = createRequire(import.meta.url);

/* Require CommonJS Modules */
const async = require("async");
const fs = require("fs");
const yargs = require("yargs");

/* Run Next Step; CLI Setup (./src/cli/cli.js) */
/* CLI Setup */
yargs.usage(
  /* Set Usage & Help */
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

yargs.version("v1.1.5"); /* Set Version */
yargs.alias("v", "version"); /* Add Version Alias */
yargs.alias("h", "help"); /* Add Help Alias */

/* Show Help by Default */
if (typeof yargs.argv._[0] === "undefined") {
  yargs.showHelp();
  /* Exit After Showing Help */
  yargs.exit(0);
}

/* Run Next Step; Loading & Parsing Config File From CLI Arguments (./src/cli/loadConfig.js) */
/* Load & Parse Config File*/

/* Create Empty Variable in Global Scope */
let configJson;

/* Load Config File */
fs.readFile(yargs.argv._[0], { encoding: "utf8" }, (error, configFile) => {
  if (error) {
    console.error(
      /* Log Error on Error */
      "\n" +
        chalk.red("Errored while loading config file!") +
        "\n" +
        "\n" +
        chalk.red("ERROR:") +
        "\n" +
        error +
        "\n"
    );
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  } else {
    console.log(
      /* Log on Completion */
      "\n" + chalk.green("Sucessfully loaded config file!") + "\n"
    );
    try {
      /* Parse Loaded Config File into Prevously-Empty Global-Scope Variable */
      configJson = JSON.parse(configFile);
    } catch (error) {
      /* Log Error on Error */
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
      /* Exit on Error, After Logging Error */
      yargs.exit(1);
    }
    /* Run Next Step; Validating Parsed Config File (./src/cli/validateConfig.js) */
    validateConfig();
  }
});
/* Validate Parsed Config File */
function validateConfig() {
  if (typeof configJson.workflow === "undefined") {
    /* Error if Workflow Value is Missing */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (typeof configJson.input === "undefined") {
    /* Error if input Value is Missing */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (typeof configJson.output === "undefined") {
    /* Error if output Value is Missing */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.workflow !== "undefined" &&
    typeof configJson.workflow !== "string"
  ) {
    /* Error if Workflow Value is Invalid Type */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.input !== "undefined" &&
    typeof configJson.input !== "string" &&
    Array.isArray(configJson.input) == false
  ) {
    /* Error if Input Value is Invalid Type */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.output !== "undefined" &&
    typeof configJson.output !== "string"
  ) {
    /* Error if Output Value is Invalid Type */
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.yellow('"output"') +
        chalk.red("value is not a string.") +
        "\n"
    );
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.workflow !== "undefined" &&
    typeof configJson.workflow === "string" &&
    configJson.workflow != "bundle"
  ) {
    /* Error if Workflow Value is Unsupported */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.input !== "undefined" &&
    typeof configJson.input === "string"
  ) {
    /* Error if Input Value is Unsupported Type */
    console.error(
      "\n" +
        chalk.red("Config JSON is invalid!") +
        "\n" +
        chalk.yellow('"input"') +
        chalk.red("value is a string, which is not supported yet.") +
        "\n"
    );
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  if (
    typeof configJson.output !== "undefined" &&
    typeof configJson.output !== "string" &&
    Array.isArray(configJson.output) == true
  ) {
    /* Error if Output Value is Unsupported Type */
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
    /* Exit on Error, After Logging Error */
    yargs.exit(1);
  }
  /* Run Next Step; Bundling Files Defined in Validated Config (./src/bundle.js) */
  bundle();
}
/* Bundling & Concatenating Files */
async function bundle() {
  if (configJson.glob === false) {
    /* If Globs are Disabled */
    async.waterfall(
      /* Run Async Functions With Each Value from Input Array */
      [
        async.apply(
          readInput,
          /* Pass Raw Inputs without Glob Matching */
          configJson.input
        ),
        async.apply(writeOutput, configJson.output),
      ],
      (error) => {
        if (error) {
          console.error(
            /* Log Error on Error */
            "\n" +
              chalk.red("Errored while bundling!") +
              "\n" +
              "\n" +
              chalk.red("ERROR:") +
              "\n" +
              error +
              "\n"
          );
          /* Exit on Error, After Logging Error */
          yargs.exit(1);
        } else {
          console.log(
            /* Log Complete on Completion */
            "\n" +
              chalk.green(
                "Sucessfully bundled files!" + "\n" + "Process Complete!"
              ) +
              "\n"
          );
          /* Exit on Completion, After Logging Complete */
          yargs.exit(0);
        }
      }
    );
  } else {
    /* If Globs are Enabled */
    async.waterfall(
      /* Run Async Functions With Each Value from Input Array */
      [
        async.apply(
          readInput,
          /* Calculate File Paths From Glob Pattern */
          await globby(configJson.input)
        ),
        async.apply(writeOutput, configJson.output),
      ],
      (error) => {
        if (error) {
          console.error(
            /* Log Error on Error */
            "\n" +
              chalk.red("Errored while bundling!") +
              "\n" +
              "\n" +
              chalk.red("ERROR:") +
              "\n" +
              error +
              "\n"
          );
          /* Exit on Error, After Logging Error */
          yargs.exit(1);
        } else {
          console.log(
            /* Log Complete on Completion */
            "\n" +
              chalk.green(
                "Sucessfully bundled files!" + "\n" + "Process Complete!"
              ) +
              "\n"
          );
          /* Exit on Completion, After Logging Complete */
          yargs.exit(0);
        }
      }
    );
  }

  /* Define Async Functions to Pass Each Array Value Into */
  function writeOutput(output, buffers, callback) {
    fs.writeFile(output, Buffer.concat(buffers), callback);
  }
  function readInput(input, callback) {
    async.mapSeries(input, readFile, callback);
    function readFile(input, callback) {
      fs.readFile(input, callback);
    }
  }
}
