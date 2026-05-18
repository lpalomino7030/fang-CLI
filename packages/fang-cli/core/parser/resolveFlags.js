export function resolveFlags(flags) {

    const config = {
        template: "default",
        bd: "none",
        auth: "false",
        orm: "none",
    };

    const validOptions = {
        template: ["default", "api"],
        bd: ["mongodb", "mysql", "postgres"],
        auth: ["true", "false"],
        orm: ["mongoose", "sequelize", "prisma", "none"],
    };

    const aliases = {
        "--template": "template",
        "--t": "template",

        "--database": "bd",
        "--db": "bd",

        "--auth": "auth",
        "--a": "auth",

        "--orm": "orm",
        "--o": "orm",
    };

    for (let i = 0; i < flags.length; i++) {

        const flag = flags[i];

        let rawKey;
        let value;

        // --template=api
        if (flag.includes("=")) {
            [rawKey, value] = flag.split("=");
        }

        else {
            rawKey = flag;

            if (!flags[i + 1] || flags[i + 1].startsWith("--")) {
                console.log(`Missing value for ${rawKey}`);
                continue;
            }

            value = flags[i + 1];
            i++;
        }

        const key = aliases[rawKey];

        if (!key) {
            console.log(`Unknown flag: ${rawKey}`);
            continue;
        }

        if (!value) {
            console.log(`Missing value for ${rawKey}`);
            continue;
        }

        const allowedValues = validOptions[key];

        if (!allowedValues.includes(value)) {
            console.log(
                `Invalid value "${value}" for ${rawKey}`
            );
            continue;
        }

        config[key] = value;
    }

    return config;
}