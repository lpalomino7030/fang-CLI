# 🐺 projectName
## Getting started

```bash
# Development mode (with hot reload)
fang dev

# Build for production
fang build

# Start production server
fang start
```

## Project structure

```
projectName/
├── src/
│   ├── index.ts        # Entry point
│   └── ...             # Your modules
├── dist/               # Compiled output (generated)
├── package.json
└── tsconfig.json
```

## Creating modules

```bash
fang module <name>
```

This generates a `<name>/` folder inside `src/` with:

- `<name>.controller.ts` — Route handlers
- `<name>.service.ts`    — Business logic
- `<name>.schema.ts`     — Data schema / types
```

## License

MIT
