const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    index: "/src/index.js",
    authorization: "/src/authorization.js",
    clinics: "/src/clinics.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "authorization.html",
      template: "src/authorization.html",
      chunks: ["authorization"],
    }),
    new HtmlWebpackPlugin({
      filename: "clinics.html",
      template: "src/clinics.html",
      chunks: ["clinics"],
    }),
  ],
};
