import fs from "fs";
import path from "path";
import { capitalizedChar } from "../core/utils/capitalizedChar.js";
import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";

export function generateSchema(name, route) {
  name = capitalizedChar(name);
  let template = `
export class I${name}Schema {
    
}  
`;

  const isExists = fs.existsSync(path.join(route, `${name}.schema.ts`));
  if (!isExists) {
    fs.writeFileSync(path.join(route, `${name}.schema.ts`), template, "utf-8");
    console.log(colorize(colors.blue, tree.branch) + ` schema created`);

  } else {
    console.log("Schema already exists");
  }
}
