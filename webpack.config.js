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
                use: {loader: 'html-loader'}
            }
        ]
    },
    externals: {
      fetch: 'fetch',
      cookies: 'Cookies',
    },
    plugins: [
    //new UglifyJsPlugin({/*minimize: true*/})
    ]
};