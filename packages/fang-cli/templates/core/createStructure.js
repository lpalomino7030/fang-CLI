import fs from "fs";
import path from "path";

export function createStructure(rootDir) {
  const folders = [
    "src",
    "src/controllers",
    "src/services",
    "src/routes",
    "src/middlewares",
    "src/schemas",
    "src/config",
    "src/utils",
  ];

  folders.forEach((folder) => {
    fs.mkdirSync(path.join(rootDir, folder), {
      recursive: true,
    });
  });
}
