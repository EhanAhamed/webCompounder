#!/usr/bin/env node

/*!
 * webCompounder v1.1.6 (https://webcompounder.ehan.dev/) (https://github.com/EhanAhamed/webCompounder/)
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
