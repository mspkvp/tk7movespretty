let webpack = require("webpack");
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./../src/js/app.js",
    output: {
        filename: "app.min.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'file-loader',
                }
            }
        ]
    },
    externals: {
      fetch: 'fetch',
      cookies: 'Cookies',
      vue: 'Vue',
    },
    plugins: [
    //new UglifyJsPlugin({/*minimize: true*/})
    ]
};