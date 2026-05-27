import fs from "fs";
import path from "path";

import { logger } from "../core/terminal/logger.js";
import { colorize, colors } from "../core/terminal/colors.js";
import { tree } from "../core/terminal/tree.js";
import { bannerCompact } from "../core/terminal/banner.js";

export function generateStyle(name, route) {
  let template = `.${name}Component {

}`;

  const isExists = fs.existsSync(path.join(route, `${name}Styles.css`));
  if (!isExists) {
    fs.writeFileSync(path.join(route, `${name}Styles.css`), template, "utf-8");
    console.log(colorize(colors.blue, tree.branch) + ` style created`);
  } else {
    console.log("Style already exists");
  }
}
