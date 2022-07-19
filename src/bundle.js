/* Bundling & Concatenating Files */
async function bundle() {
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
