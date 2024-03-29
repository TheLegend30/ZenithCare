const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    index: "/src/index.js",
    authorization: "/src/authorization.js",
    clinics: "/src/clinics.js",
    include: "/src/include.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["index", "include"],
    }),
    new HtmlWebpackPlugin({
      filename: "authorization.html",
      template: "src/authorization.html",
      chunks: ["authorization"],
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "src/about.html",
      chunks: ["include"],
    }),
    new HtmlWebpackPlugin({
      filename: "clinics.html",
      template: "src/clinics.html",
      chunks: ["clinics", "include"],
    }),
    new HtmlWebpackPlugin({
      filename: "header.html",
      template: "src/header.html",
    }),
    new HtmlWebpackPlugin({
      filename: "contacts.html",
      template: "src/contacts.html",
      chunks: ["include"],
    }),
    new HtmlWebpackPlugin({
      filename: "partner.html",
      template: "src/partner.html",
      chunks: ["include"],
    }),
    new HtmlWebpackPlugin({
      filename: "rules.html",
      template: "src/rules.html",
      chunks: ["include"],
    }),
    new HtmlWebpackPlugin({
      filename: "confidentiality.html",
      template: "src/confidentiality.html",
      chunks: ["include"],
    }),
    new HtmlWebpackPlugin({
      filename: "footer.html",
      template: "src/footer.html",
    }),
  ],
};
