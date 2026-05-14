import fs from "fs";
import path from "path";

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
    console.log("Controller created successfully");
  } else {
    console.log("Controller already exists");
  }
}
