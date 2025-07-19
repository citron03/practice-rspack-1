const { container } = require('@rspack/core');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'vanilla_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.js',
      },
    }),
  ],
};
