module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["vue"],
  env: {
    node: true,
  },
  "parser": "@typescript-eslint/parser",
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-this-alias": ["off"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
