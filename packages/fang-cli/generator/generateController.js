import fs from "fs";
import path from "path";
import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";

export function generateController(name, route) {
  let template = `
import { Fang } from "@fang-js/fang";

export class ${name}Controller {  
    
}
`;

  const isExists = fs.existsSync(path.join(route, `${name}Controller.ts`));
  if (!isExists) {
    fs.writeFileSync(
      path.join(route, `${name}Controller.ts`),
      template,
      "utf-8",
    );
    console.log(colorize(colors.blue, tree.last) + ` controller created`);

    // console.log("Controller created successfully");
  } else {
    console.log("Controller already exists");
  }
}
