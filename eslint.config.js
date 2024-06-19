import globals from "globals";

export default [
    {
        files: ["src/**/*.js"],
        ignores: ["**/*.config.js"],
        rules: {
            "no-unused-vars": "error",
            "no-undef": "warn",
            "no-console": "warn",
            "semi": ["error", "always"],
            "quotes": ["error", "single"],
            "no-multiple-empty-lines": "error",
            "eol-last": "error"
        }
    },
    {languageOptions: {globals: globals.browser}},
];