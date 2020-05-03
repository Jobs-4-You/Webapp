/* eslint-disable */
const result = require('dotenv').config();
console.log(result);
const withPlugins = require('next-compose-plugins');
const less = require('@zeit/next-less');
const bundleAnalyzer = require('@next/bundle-analyzer');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const nextConfig = {
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    NEXT_GRAPHQL_PROXY_URI: process.env.NEXT_GRAPHQL_PROXY_URI,
    API_URI: process.env.API_URI,
  },
};

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

//const withBundleAnalyzer = require('@next/bundle-analyzer')({
//  enabled: process.env.ANALYZE === 'true',
//});
//module.exports = withBundleAnalyzer({});

module.exports = withPlugins(
  [
    [
      less,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables, // make your antd custom effective
        },
        webpack: (config, { isServer }) => {
          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader',
            });
          }
          return config;
        },
      },
    ],
    [bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }), {}],
  ],
  nextConfig
);
