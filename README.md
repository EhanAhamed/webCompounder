<br>
<br>
<h1 align="center"> webCompounder </h1>
<p align="center"> A tool to bundle files; <br> and simplify web development. </p> 
<p align="center"> <a href="https://webcompounder.ehan.dev/"> Website </a> - <a href="https://github.com/EhanAhamed/webCompounder"> Source Code (GitHub) </a> - <a href="https://www.npmjs.com/package/webcompounder"> Node Module (npm) </a> - <a href="https://github.com/EhanAhamed/webcompounder.ehan.dev/"> Website Source Code (GitHub) </a> </p>

<br>
<h2>📦 Installation </h2>

You can install webCompounder from npm, like any other npm package.

```shell
> npm install webcompounder --save-dev
```

You should _probably_ install it as a developer dependency, using the `--save-dev` flag. (Unless you have a reason not to, of course.)

Unlike some npm packages, webCompounder does **not** need to be installed globally to work. (It will only work within the folder it's installed into, though. But in most cases thats all you need.)

<br>
<h2>🔧 Command-Line Usage</h2>

webCompounder doesn't use a lot of flags or command line arguements, instead you set the options in a configuration file.

If you have different workflows with different options, you can have multiple configuration files, and can run configuration file one at a time.

Then you put the path to the configuration file as an arguement in the command.

```shell
> webCompounder ./pathTo/configFile.json
```

<br>
<h2>📋 Configuration Files</h2>

Configuration files are JSON files with an input value, an output value, and an optional callback value.

The configuration file can have any filename and can be in any folder, but must be a json file and can **not** be outside of the root folder.

Here's an example:

```json
{
  "input": [
    "./pathTo/file.extension",
    "./pathTo/anotherFile.extension",
    "./yetAnother.extension"
  ],
  "output": "./pathToOutputFile/outputFile.extension",
  "callback": {
    "functionParameter": "variablePassedOnError",
    "functionBody": "if (variablePassedOnError) { /* do something on error*/ } else { /* do something when complete & no error */}"
  }
}
```

Here's another, more _real-world_ example:

```json
{
  "input": ["./src/utils/colors.js", "./src/utils/utils.js", "./src/main.js"],
  "output": "./build/main.build.js",
  "callback": {
    "functionParameter": "error",
    "functionBody": "if (error) { console.error('\n' + error + '\n') } else { console.log('\n' + 'Build Completed' + '\n') }"
  }
}
```

The input value is an array, and each string in the array is a file path to the files you want to merge together.

The output value is a single string, and is a file path pointing to the file that all the other files will combine into.

_All_ the file paths are relative to the **root** folder, where `package.json` is and where your terminal/shell session is, _even_ if the configuration file is **not** in the root folder, paths are **still** relative to the root folder!

The callback value is an object. Inside of the callback value is a functionParameter value and a functionBody value. The functionParameter is the variable that gets passed on error. The functionBody is the body of your callback function.

The functionParameter's variable will not exist if there is no error, you can use this to create an error message on error and a sucess message on completion.

<br>
<h2>📁 In-Depth Usage Example </h2>

**Installation:** `./`

```shell
> npm install webcompounder --save-dev
```

<br>

Input File: `./src/utils/colors.js`

**This file's code does not matter, its just an example of a file that will be combined.**

```javascript
var colors = {
  red: "#ff0000",
  orange: "#ff5500",
  yellow: "#ffff00",
  green: "#00ff00",
  blue: "#0000ff",
  purple: "#ff00ff",
  white: "#ffffff",
  gray: "#555555",
  black: "#000000",
};
```

<br>

**Input File:** `./src/utils/utils.js`

**This file's code does not matter, its just an example of a file that will be combined.**

```javascript
var utils = {
  colors: colors,
};
```

<br>

Input File: `./src/main.js`

**This file's code does not matter, its just an example of a file that will be combined.**

```javascript
var someLibrary = {
  utils: utils,
};
```

<br>

**Configuration File:** `./build/config/buildJs.json`

```json
{
  "input": ["./src/utils/colors.js", "./src/utils/utils.js", "./src/main.js"],
  "output": "./build/main.build.js",
  "callback": {
    "functionParameter": "error",
    "functionBody": "if (error) { console.error('\n' + error + '\n') } else { console.log('\n' + 'Build Completed' + '\n') }"
  }
}
```

**Notice how even though the configuration file is in `./build/config/`, the paths are relative to `./`. This is because `./` is where webCompounder was installed into.**

<br>

**Terminal/Shell:** `./`

```shell
> webCompounder --version
1.1.4
> webCompounder ./build/config/buildJs.json
Build Completed
```

**You can run `webCompounder --version` to check the version of webCompounder that's installed. This also helps test if webCompounder is working.**

<br>

Output File: `./build/main.build.js`

**This file's code does not matter, its just an example of a file that was generated.**

```javascript
var colors = {
  red: "#ff0000",
  orange: "#ff5500",
  yellow: "#ffff00",
  green: "#00ff00",
  blue: "#0000ff",
  purple: "#ff00ff",
  white: "#ffffff",
  gray: "#555555",
  black: "#000000",
};

var utils = {
  colors: colors,
};

var someLibrary = {
  utils: utils,
};
```

<br>

<h1 align="center"> webCompounder </h1>
<p align="center">Copyright (c) 2022 Ehan Ahamed and contributors <br> Licensed Under the UPL-1.0 License <br> <a href="https://github.com/EhanAhamed/webCompounder/blob/main/LICENSE.txt">See License File</a></p>
<br />
<br />
