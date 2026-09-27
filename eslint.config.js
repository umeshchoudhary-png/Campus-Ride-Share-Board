const js = require("@eslint/js");

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                require: "readonly",
                module: "readonly",
                __dirname: "readonly",
                console: "readonly",
                document: "readonly",
                localStorage: "readonly"
            }
        },
        rules: {
            ...js.configs.recommended.rules
        }
    }
];