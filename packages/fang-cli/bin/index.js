#!/usr/bin/env node

import { createProject } from "../commands/create.js";
import { startProject } from "../commands/start.js";
import { buildProject } from "../commands/build.js";
import { runProject } from "../commands/run.js";
import { module } from "../commands/modules.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "create":
  case "new":
    createProject(args[1], args.slice(2));
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
    module(args[1], args.slice(2));
    break;
  default:
    console.log("Comando no reconocido");
}
