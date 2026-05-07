import fs from "fs";
import path from "path";
import { capitalizedChar } from "./capitalizedChar.js";

export function generateService(name, route) {
  name = capitalizedChar(name);
  let template = `
import { I${name}Schema } from "./SchemaHello.js";

export class ${name}Service {

  

}
`;

  const isExists = fs.existsSync(path.join(route, `${name}Service.ts`));
  if (!isExists) {
    fs.writeFileSync(path.join(route, `${name}Service.ts`), template, "utf-8");
    console.log("Service created successfully");
  } else {
    console.log("Service already exists");
  }
}
