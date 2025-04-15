module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  customSyntax: "postcss-less", // Add this to support LESS syntax
  rules: {
    "order/properties-alphabetical-order": true,
    "no-invalid-double-slash-comments": null, // Disable rule for double-slash comments in LESS
    "block-no-empty": true, // Keep this rule to prevent empty blocks
    "property-no-unknown": [true, { ignoreProperties: ["//"] }], // Ignore "//" as a property
  },
};
