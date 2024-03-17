const styleguide = require("@vercel/style-guide/prettier");

module.export = {
  ...styleguide,
  plugins: [...styleguide.plugins, "prettier-plugin-tailwindcss"],
};
