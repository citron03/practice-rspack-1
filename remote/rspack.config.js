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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  builtins: {
    react: {
      runtime: 'automatic', // ✅ 자동 import 설정 (React 17+ 스타일)
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.tsx",
        './Counter': './src/Counter.tsx',
        './store': './src/storeProxy',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
        zustand: { singleton: true, requiredVersion: false },
      },
    }),
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