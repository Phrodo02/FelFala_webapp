// If you change the settings you will need to restart the ESLint server or VSCode
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  rules: {
    // "sort-imports": ["error", { ignoreCase: true }],
    "vue/attributes-order": ["error", { alphabetical: true }],
    // "no-console": "error",
  },
  ignorePatterns: ["coverage", "dist", "node_modules"],
};
