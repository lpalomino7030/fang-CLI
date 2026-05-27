import fs from "fs";
import path from "path";
import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";

export function generateLogic(name, route) {
  let template = `
import React from 'react';
import "./${name}Styles.css";

export const ${name}Component = () => {
  return (
    <div>Component ${name}!</div>
  )
}
`;

  const isExists = fs.existsSync(path.join(route, `${name}Component.jsx`));

  if (!isExists) {
    fs.writeFileSync(
      path.join(route, `${name}Component.jsx`),
      template,
      "utf-8",
    );

    console.log(colorize(colors.blue, tree.last) + ` component created`);
  } else {
    console.log("Component already exists");
  }
}
