"use strict";
const isProduction = process.env.NODE_ENV === "production";
const path = require("path");
const webpack = require("webpack");
const packageJSON = require("./package.json");

const webpackConfig = {
  mode: "development",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "storage-expire.js",
    library: "StorageExpire",
    libraryTarget: "umd",
    umdNamedDefine: true,
    libraryExport: "default",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  plugins: [
    new webpack.BannerPlugin(
      `${packageJSON.name}
@version: ${packageJSON.version}
@author: ${packageJSON.author}
@license: ${packageJSON.license}`
    ),
  ],
  resolve: {
    extensions: [".js"],
  },
};

if (isProduction) {
  webpackConfig.mode = "production";
}

module.exports = webpackConfig;
