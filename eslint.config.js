const js = require("@eslint/js");

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                // Node.js globals
                require: "readonly",
                module: "readonly",
                __dirname: "readonly",
                process: "readonly",
                console: "readonly",

                // Browser globals
                document: "readonly",
                localStorage: "readonly",
                fetch: "readonly",
                alert: "readonly"
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    }
];