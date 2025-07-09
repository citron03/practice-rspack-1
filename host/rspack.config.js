const path = require("path");
const { ModuleFederationPlugin } = require("@rspack/core").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:3000/",
    uniqueName: "host",
  },
  mode: "development",
  devServer: {
    port: 3000,
    hot: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote: "remote@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  resolve: { 
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      shared: path.resolve(__dirname, '../shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "swc-loader",
      },
    ],
  },
};