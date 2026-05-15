import cliPackage from "../../package.json" with { type: "json" };

export const CLI_VERSION = cliPackage.version;

let FRAMEWORK_VERSION = "development";

try {
    const fang = await import("@fang-js/fang");

    FRAMEWORK_VERSION = fang.VERSION;
} catch {
    const frameworkPackage = await import(
        "../../../fang-core/package.json",
        { with: { type: "json" } }
    );

    FRAMEWORK_VERSION = frameworkPackage.default.version;
}

export { FRAMEWORK_VERSION };