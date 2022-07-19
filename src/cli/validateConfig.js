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
