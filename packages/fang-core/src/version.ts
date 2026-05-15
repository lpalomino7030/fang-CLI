/* ---- VERSION FLAG FROM FANG CORE ---- */

import packageJson from "../package.json" with { type: "json" };

const VERSION = packageJson.version;

export { VERSION };