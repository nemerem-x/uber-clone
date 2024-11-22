module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
