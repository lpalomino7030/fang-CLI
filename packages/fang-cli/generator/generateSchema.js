import fs from "fs";
import path from "path";
import { capitalizedChar } from "../utils/capitalizedChar.js";

export function generateSchema(name, route) {
  name = capitalizedChar(name);
  let template = `
export class I${name}Schema {
    
}  
`;

  const isExists = fs.existsSync(path.join(route, `${name}.schema.ts`));
  if (!isExists) {
    fs.writeFileSync(path.join(route, `${name}.schema.ts`), template, "utf-8");
    console.log("Schema created successfully");
  } else {
    console.log("Schema already exists");
  }
}
