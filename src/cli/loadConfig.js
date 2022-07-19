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
