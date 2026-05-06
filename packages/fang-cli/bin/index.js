#!/usr/bin/env node

import { createProject } from "../commands/create.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "create":
  case "new":
    createProject(args[1], args.slice(2));
    break;

  default:
    console.log("Comando no reconocido");
}
