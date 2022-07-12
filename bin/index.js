#! /usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");

const usage = "\n" + "Usage: webCompounder ./pathTo/configFile.json";
const options = yargs.usage(usage).help(true).argv;

const configFile = JSON.parse(fs.readFileSync(yargs.argv._[0], { encoding: "utf-8" }));

console.log(configFile.name)
