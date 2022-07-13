#! /usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
var async = require("async");

const usage =
  "\n" +
  "Usage: `webCompounder ./pathTo/configFile.json`" +
  "\n" +
  "\n" +
  "See the website or repository for help with the cli or config files." +
  "\n" +
  "(https://webcompounder.ehan.dev/) (https://github.com/EhanAhamed/webCompounder/)";
const options = yargs.usage(usage).help(true).argv;

if (yargs.argv._[0] == null) {
  console.error(
    "\n" +
      "No config file specified," +
      "\n" +
      "Use `webCompounder --help` for help." +
      "\n"
  );
}

if (yargs.argv._[0] != null) {
  const configJson = JSON.parse(
    fs.readFileSync(yargs.argv._[0], { encoding: "utf-8" })
  );

  if (yargs.argv._[0] != null && Array.isArray(configJson.input) == false) {
    console.error(
      "\n" +
        "Config file does not have an input value, or input value is invalid." +
        "\n" +
        "\n" +
        "See the website or repository for help with config files." +
        "\n" +
        "(https://webcompounder.ehan.dev/) (https://github.com/EhanAhamed/webCompounder/)" +
        "\n"
    );
  }

  if (yargs.argv._[0] != null && typeof configJson.output !== "string") {
    console.error(
      "\n" +
        "Config file does not have an output value, or output value is invalid" +
        "\n" +
        "\n" +
        "See the website or repository for help with config files." +
        "\n" +
        "(https://webcompounder.ehan.dev/) (https://github.com/EhanAhamed/webCompounder/)" +
        "\n"
    );
  }

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
