#!/usr/bin/env node

import { createProject } from "../commands/create.js";
import { startProject } from "../commands/start.js";
import { buildProject } from "../commands/build.js";
import { runProject } from "../commands/run.js";
import { module } from "../commands/modules.js";
import { version } from "../commands/version.js";
import { unknowComand } from "../core/terminal/unknowComand.js";
import { addFeature } from "../commands/add.js";
import { help } from "../commands/help.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "create":
  case "new":
    createProject(args[1], args.slice(2));
    break;
  case "add":
    addFeature(args.slice(1));
    break;
  case "start":
    startProject(args[1]);
    break;
  case "build":
    buildProject(args[1]);
    break;
  case "dev":
  case "run":
    runProject(args[1]);
    break;
  case "module":
    module(args[1]);
    break;
  case "help":
  case "--help":
  case "-h":
    help();
    break;
  case "version":
  case "--version":
  case "-v":
    version();
    break;
  default:
    unknowComand(args[0]);
    break;
}
