import fs from "fs";
import path from "path";
import { capitalizedChar } from "./capitalizedChar.js";

export function generateSchema(name, route) {
  name = capitalizedChar(name);
  let template = `
export class I${name}Schema {
    
}  
`;

  const isExists = fs.existsSync(path.join(route, `I${name}Schema.ts`));
  if (!isExists) {
    fs.writeFileSync(path.join(route, `I${name}Schema.ts`), template, "utf-8");
    console.log("Schema created successfully");
  } else {
    console.log("Schema already exists");
  }
}
