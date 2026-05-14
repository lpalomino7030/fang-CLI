import fs from "fs";
import path from "path";

export function createFiles(rootDir, projectName) {
  const packageTemplate = {
    name: projectName,
    version: "1.0.0",
    type: "module",
    main: "./dist/index.js",
    types: "./dist/index.d.ts",
    scripts: {
      dev: "node --loader ts-node/esm src/index.ts",
      build: "tsc",
      start: "node dist/index.js",
    },
    dependencies: {
      "@fang-js/fang": "^1.0.0",
    },
    devDependencies: {
      typescript: "^5.4.0",
      "ts-node": "^10.9.2",
      "@types/node": "^20.0.0",
    },
  };

  const tsConfigTemplate = {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      outDir: "dist",
      rootDir: "src",
      strict: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    include: ["src/**/*.ts"],
    exclude: ["dist", "node_modules"],
  };

  const indexTemplate = `
import { Fang } from '@fang-js/fang';

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({ message: "Fang JS ahora ruge con TypeScript! 🐺" });
});

app.listen(3000);
`;

  const gitIgnoreTemplate = `
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
bun-debug.log*

# Runtime
pids/
*.pid
*.seed
*.pid.lock

# Coverage
coverage/

# Cache
.cache/
.temp/
.tmp/
tsconfig.tsbuildinfo

# OS files
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/

# Testing
playwright-report/
test-results/

# Temporary files
*.tmp
*.swp

# Docker
docker-data/

# Fang specific
.fang/

# Optional uploads folder
uploads/

# SQLite databases
*.sqlite
*.db
`;

  fs.writeFileSync(
    path.join(rootDir, "package.json"),
    JSON.stringify(packageTemplate, null, 2),
  );

  fs.writeFileSync(
    path.join(rootDir, "tsconfig.json"),
    JSON.stringify(tsConfigTemplate, null, 2),
  );

  fs.writeFileSync(path.join(rootDir, "src/index.ts"), indexTemplate);

  fs.writeFileSync(path.join(rootDir, ".gitignore"), gitIgnoreTemplate);
}
