const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

let nextConfigs = {
  typescript: {
    ignoreDevErrors: true,
  },
  poweredByHeader: false,
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
  },
  webpack(config, { isServer }) {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };

    config.node = {
      fs: "empty",
    };

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          publicPath: "/_next/static",
          outputPath: "../public/images/",
          name: "[name].[ext]",
        },
      },
    });

    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );

    return config;
  },
};

nextConfigs = withCSS(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    ...nextConfigs,
  })
);

module.exports = nextConfigs;
