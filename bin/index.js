#! /usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
var async = require("async");

const usage = "\n" + "Usage: webCompounder ./pathTo/configFile.json";
const options = yargs.usage(usage).help(true).argv;

const configJson = JSON.parse(
  fs.readFileSync(yargs.argv._[0], { encoding: "utf-8" })
);

async.waterfall(
  [
    async.apply(readInput, configJson.input),
    async.apply(writeOutput, configJson.output),
  ],
  configJson.callback
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
