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
