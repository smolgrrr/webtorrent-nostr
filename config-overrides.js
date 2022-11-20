const webpack = require("webpack");
const {
  override,
  addWebpackPlugin,
} = require("customize-cra");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = override(
  addWebpackPlugin(new NodePolyfillPlugin()),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ),
);