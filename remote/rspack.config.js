const path = require("path");
const { ModuleFederationPlugin } = require("@rspack/core").container;

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:3001/",
    uniqueName: "remote",
  },
  mode: "development",
  devServer: {
    port: 3001,
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "swc-loader",
      },
    ],
  },
};